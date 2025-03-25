const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const docsRouter = express.Router();

const MAX_TOKENS = 500;

function countTokens(text) {    
    return text.split(/[\s.,;:!?(){}\[\]<>+=\-*/&|^%]+/).filter(token => token.trim().length > 0).length;
}

async function splitCodebase(code) {
    const chunks = [];
    let currentChunk = [];
    let currentTokens = 0;
    let currentStructure = [];

    const lines = code.split('\n');
    
    for (const line of lines) {
        const trimmedLine = line.trim();
        const isNewStructure = trimmedLine.startsWith('class ') || 
                              trimmedLine.startsWith('function ') ||
                              trimmedLine.match(/^(export\s+)?(const|let|var)\s+\w+\s*=\s*(\(.*\)\s*=>|function)/);

        if (isNewStructure) {
            if (currentStructure.length > 0) {
                const structureCode = currentStructure.join('\n');
                const structureTokens = countTokens(structureCode);

                if (structureTokens > MAX_TOKENS) {

                    const subChunks = forceSplit(structureCode);
                    chunks.push(...subChunks);

                } else if (currentTokens + structureTokens > MAX_TOKENS) {
                    chunks.push(currentChunk.join('\n'));
                    currentChunk = [structureCode];
                    currentTokens = structureTokens;
                } else {
                    currentChunk.push(structureCode);
                    currentTokens += structureTokens;
                }
                
                currentStructure = [];
            }
            currentStructure.push(line);
        } else if (currentStructure.length > 0) {
            currentStructure.push(line);
        } else {
            const lineTokens = countTokens(line);
            
            if (currentTokens + lineTokens > MAX_TOKENS) {
                chunks.push(currentChunk.join('\n'));
                currentChunk = [line];
                currentTokens = lineTokens;
            } else {
                currentChunk.push(line);
                currentTokens += lineTokens;
            }
        }
    }

    if (currentStructure.length > 0) {
        const structureCode = currentStructure.join('\n');
        const structureTokens = countTokens(structureCode);
        
        if (structureTokens > MAX_TOKENS) {
            const subChunks = forceSplit(structureCode);
            chunks.push(...subChunks);
        } else if (currentTokens + structureTokens > MAX_TOKENS) {
            chunks.push(currentChunk.join('\n'));
            chunks.push(structureCode);
        } else {
            currentChunk.push(structureCode);
            chunks.push(currentChunk.join('\n'));
        }
    } else if (currentChunk.length > 0) {
        chunks.push(currentChunk.join('\n'));
    }

    return chunks;
}

function forceSplit(code) {
    const chunks = [];
    let currentChunk = [];
    let currentTokens = 0;
    
    const lines = code.split('\n');
    
    for (const line of lines) {
        const lineTokens = countTokens(line);
        
        if (currentTokens + lineTokens > MAX_TOKENS) {
            chunks.push(currentChunk.join('\n'));
            currentChunk = [line];
            currentTokens = lineTokens;
        } else {
            currentChunk.push(line);
            currentTokens += lineTokens;
        }
    }
    
    if (currentChunk.length > 0) {
        chunks.push(currentChunk.join('\n'));
    }
    
    return chunks;
}

const processingQueue = [];

docsRouter.post('/process', authMiddleware, async (req, res) => {
    console.log("reached backend");
    try {
        const { codebase } = req.body;
        console.log(codebase);

        if (!codebase || typeof codebase !== 'string') {
            return res.status(400).json({ error: 'Invalid codebase provided' });
        }

        const totalTokens = countTokens(codebase);
        if (totalTokens > MAX_TOKENS * 10) { 
            return res.status(413).json({ error: 'Codebase too large' });
        }

        
        const chunks = await splitCodebase(codebase);
        console.log(totalTokens);
        console.log(chunks.length);
        console.log(chunks[0]);
        console.log(chunks[chunks.length - 1]);
        
        
        
        const queueEntries = chunks.map((content, index) => ({
            chunkId: Date.now() + index,
            position: index + 1,
            tokens: countTokens(content),
            content,
            status: 'queued',
            createdAt: new Date()
        }));

        processingQueue.push(...queueEntries);

        res.status(200).json({
            message: 'Codebase processed and queued',
            totalChunks: chunks.length,
            totalTokens,
            chunks: queueEntries.map(entry => ({
                chunkId: entry.chunkId,
                position: entry.position,
                tokens: entry.tokens,
                firstLine: entry.content.split('\n')[0].trim()
            }))
        });
      
    } catch (error) {
        console.error('Processing error:', error);
        res.status(500).json({ error: 'Failed to process codebase', details: error.message });
    }
});

docsRouter.get('/', authMiddleware, (req, res) => {
    res.status(200).json({
        message: 'Welcome to Docs',
        queueStatus: {
            pending: processingQueue.filter(item => item.status === 'queued').length,
            total: processingQueue.length
        }
    });
});

module.exports = docsRouter;