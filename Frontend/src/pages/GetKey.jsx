import axios from "axios";
import { useState } from "react"

const backendUrl = import.meta.env.VITE_BACKEND_URL;


const message = `#include<iostream>
#include<fstream>
#include<iomanip>
#include<string>
using namespace std;

class login_signup
{
    protected:
    char name[20],address[40],email_id[20];
    
    long long contactno;
    int age;
    

    public:
        char password[20];
        void getdata()
        {
            cout<<"Enter your name please: "<<endl;
            cin>>name;
            cout<<"Enter your contact number :"<<endl;
            cin>>contactno;
            cout<<"Enter your age :"<<endl;
            cin>>age;
            cout<<"Enter email id "<<endl;
            cin>>email_id;
            cout<<"Enter your password:"<<endl;
            cin>>password;
            cout<<"Enter your address please: "<<endl;
            cin>>address;

        }
   
        void display()
        {
            cout<<endl<<setw(10)<<name<<setw(20)<<address<<setw(20)<<email_id<<setw(20)<<contactno<<setw(20)<<password<<setw(20)<<age<<endl;   
        }
        string getemail()
        {
            return email_id;
        }
        string getpassword()
        {
            return password;
        }

};

class operations:public login_signup
{

 fstream datafile01;
 fstream secdatafile;
public:
        bool login_or_not;
        bool administrator_or_not;

         operations(char*filename,char*sec_filename)    // constructor to directly open file;
           {
            datafile01.open(filename,ios::in|ios::out|ios::ate|ios::binary);
            secdatafile.open(sec_filename,ios::in|ios::out|ios::ate|ios::binary);
           }

        void registration()
        {
            int choice;
            cout<<"You want to register as Administrator or customer:"<<endl;
            cout<<"1. for Administrator\n 2. for Customer:"<<endl;
            cin>>choice;

            if(choice==1)
            {
             login_signup l1;
            l1.getdata();
            datafile01.seekp(0,ios::end); // to indicate at the end of alredy existed text in file
            datafile01.write((char*)&l1,sizeof(l1));
            datafile01.clear();
            }

            else if(choice==2)
            {
                login_signup l1;
                l1.getdata();
                secdatafile.seekp(0,ios::end); // to indicate at the end of alredy existed text in file
                secdatafile.write((char*)&l1,sizeof(l1));
               secdatafile.clear();  
            }
        }

        void login()
        {
            int choice;
            cout<<"You want to Login as Administrator or customer:"<<endl;
            cout<<"1. for Administrator\n 2. for Customer:"<<endl;
            cin>>choice;

            if(choice==1)
            {
                    administrator_or_not=true;
                    char EMAIL[20];
                    char PASSWORD[20];
                    login_or_not=false;
                    login_signup l1;
                    datafile01.seekg(0,ios::beg);
                    cout<<"Enter your email: "<<endl;
                    cin>>EMAIL;
                    cout<<"Enter your login password:"<<endl;
                    cin>>PASSWORD;
                    while(datafile01.read((char*)&l1,sizeof(l1)))
                    {
                        if(l1.getemail()==EMAIL)
                        {
                            if(PASSWORD==l1.getpassword())
                            {
                                cout<<"sucessfully login\n";
                                    login_or_not=true;
                            }

                            else
                            {
                                cout<<"Incorrect password"<<endl;
                            }
                                break;
                        }

                    }
                    datafile01.clear();
                    cout<<endl;
            }


            else if(choice==2)
            {

                    administrator_or_not=false;
                    char EMAIL[20];
                    char PASSWORD[20];
                    login_or_not=false;
                    login_signup l1;
                    secdatafile.seekg(0,ios::beg);
                    cout<<"Enter your email: "<<endl;
                    cin>>EMAIL;
                    cout<<"Enter your login password:"<<endl;
                    cin>>PASSWORD;
                    while(secdatafile.read((char*)&l1,sizeof(l1)))
                    {
                        if(l1.getemail()==EMAIL)
                        {
                            if(PASSWORD==l1.getpassword())
                            {
                                cout<<"sucessfully login\n";
                                    login_or_not=true;
                            }
                            else
                            {
                                cout<<"Incorrect password\n";
                            }
                            break;
                        }

                    }
                    secdatafile.clear();
                    cout<<endl;
            }
            
        }


        void deleteaccount()
        {
            int choice;
            cout<<"You want to Delete account of  Administrator or customer:"<<endl;
            cout<<"1. for Administrator\n 2. for Customer:"<<endl;
            cin>>choice;

                if(choice==1)
                {

                        char EMAIL[20];
                        cout<<"ENter your Email ID:"<<endl;
                        cin>>EMAIL;

                        ofstream outfile("temperary.dat",ios::binary);
                        datafile01.seekg(0,ios::beg);
                        bool flag=false;
                        login_signup l1;
                        while(datafile01.read((char*)&l1,sizeof(l1)))
                        {
                            if(l1.getemail()==EMAIL)
                            {
                                
                                flag=true;
                                cout<<"Data of "<<EMAIL<<" has been Sucessfully removed:\n";
                                continue;
                                
                            }
                            else
                        outfile.write((char*)&l1,sizeof(l1)); 
                        }
                            
                            outfile.close();
                            datafile01.close();
                            datafile01.open("login&signup.dat",ios::in|ios::out|ios::trunc|ios::binary);

                            login_signup l2;
                            ifstream infile("temperary.dat",ios::binary);
                            infile.seekg(0,ios::beg);
                            while(infile.read((char*)&l2,sizeof(l2)))
                            {
                                datafile01.write((char*)&l2,sizeof(l2));
                            }
                            infile.close();
                            
                            datafile01.clear(); // to again clear all operation and point towards from start of file;
                            
                        if(flag==false)
                        {
                            cout<<"Data of given email doesnot exist:\n";
                        }
                        
                }
            
                else if(choice==2)
                {

                        char EMAIL[20];
                        cout<<"ENter your Email ID:"<<endl;
                        cin>>EMAIL;

                        ofstream outfile("temperary.dat",ios::binary);
                        secdatafile.seekg(0,ios::beg);
                        bool flag=false;
                        login_signup l1;
                        while(secdatafile.read((char*)&l1,sizeof(l1)))
                        {
                            if(l1.getemail()==EMAIL)
                            {
                                
                                flag=true;
                                cout<<"Data of "<<EMAIL<<" has been Sucessfully removed:\n";
                                continue;
                                
                            }
                            else
                        outfile.write((char*)&l1,sizeof(l1)); 
                        }
                            
                            outfile.close();
                            secdatafile.close();
                            secdatafile.open("login&signup01.dat",ios::in|ios::out|ios::trunc|ios::binary);

                            login_signup l2;
                            ifstream infile("temperary.dat",ios::binary);
                            infile.seekg(0,ios::beg);
                            while(infile.read((char*)&l2,sizeof(l2)))
                            {
                                secdatafile.write((char*)&l2,sizeof(l2));
                            }
                            infile.close();
                            
                            secdatafile.clear(); // to again clear all operation and point towards from start of file;
                            
                        if(flag==false)
                        {
                            cout<<"Data of given email doesnot exist:\n";
                        }
                }
        }
       
        void forgotpassword()
        {
            int choice;
            cout<<"You want to change password of  Administrator or customer account:"<<endl;
            cout<<"1. for Administrator\n 2. for Customer:"<<endl;
            cin>>choice;

            
                if(choice==1)
                {
                    char EMAIL[20];
                    cout<<"Enter your Email ID:"<<endl;
                    cin>>EMAIL;
                    ofstream outfile("temperary.dat",ios::binary);
                    datafile01.seekg(0,ios::beg);
                    bool flag=false;
                    login_signup l1;
                    while(datafile01.read((char*)&l1,sizeof(l1)))
                    {
                            if(l1.getemail()==EMAIL)
                            { 
                                char pass[20];

                                flag=true;
                                cout<<"Enter New password : "<<endl;
                                cin>>pass;
                                for(int i=0;i<20;i++)
                                {
                                l1.password[i]=pass[i];
                                };
                                
                                outfile.write((char*)&l1,sizeof(l1));
                                cout<<"Data successfully modified: "<<endl;
                                
                            }
                        else
                    outfile.write((char*)&l1,sizeof(l1)); 
                    }

                    
                    if(flag==false)
                    {
                        cout<<"Data of given Account doesnot exist:\n";
                    }

                    datafile01.close(); 
                    outfile.close();
                    
                    datafile01.open("login&signup.dat",ios::in|ios::out|ios::trunc|ios::binary);

                    login_signup l2;
                    ifstream infile("temperary.dat",ios::binary);
                    infile.seekg(0,ios::beg);
                    while(infile.read((char*)&l2,sizeof(l2)))
                    {
                        datafile01.write((char*)&l2,sizeof(l2));
                    }
                    infile.close();
                    
                    datafile01.clear(); // to again clear all operation and point towards from start of file;

                }

                else if(choice==2)
                {
                    char EMAIL[20];
                    cout<<"Enter your Email ID:"<<endl;
                    cin>>EMAIL;
                    ofstream outfile("temperary.dat",ios::binary);
                    secdatafile.seekg(0,ios::beg);
                    bool flag=false;
                    login_signup l1;
                    while(secdatafile.read((char*)&l1,sizeof(l1)))
                    {
                            if(l1.getemail()==EMAIL)
                            { 
                                char pass[20];

                                flag=true;
                                cout<<"Enter New password : "<<endl;
                                cin>>pass;
                                for(int i=0;i<20;i++)
                                {
                                l1.password[i]=pass[i];
                                };
                                
                                outfile.write((char*)&l1,sizeof(l1));
                                cout<<"Data successfully modified: "<<endl;
                                
                            }
                        else
                    outfile.write((char*)&l1,sizeof(l1)); 
                    }

                    
                    if(flag==false)
                    {
                        cout<<"Data of given Account doesnot exist:\n";
                    }

                    secdatafile.close(); 
                    outfile.close();
                    
                    secdatafile.open("login&signup01.dat",ios::in|ios::out|ios::trunc|ios::binary);

                    login_signup l2;
                    ifstream infile("temperary.dat",ios::binary);
                    infile.seekg(0,ios::beg);
                    while(infile.read((char*)&l2,sizeof(l2)))
                    {
                        secdatafile.write((char*)&l2,sizeof(l2));
                    }
                    infile.close();
                    
                    secdatafile.clear(); // to again clear all operation and point towards from start of file;

                }
        }

        void display()
        {
            int choice;
            cout<<"You want Display Administrator or customer Accounts:"<<endl;
            cout<<"1. for Administrator\n 2. for Customer:"<<endl;
            cin>>choice;

            if(choice==1)
            {
                cout<<endl<<setw(10)<<"NAME"<<setw(20)<<"ADDRESS"<<setw(20)<<"EMAIL_ID"<<setw(20)<<"CONTACT NO"<<setw(20)<<"PASSWORD"<<setw(20)<<"AGE"<<endl;
                login_signup l1;
                datafile01.seekg(0,ios::beg);
                while(datafile01.read((char*)&l1,sizeof(l1)))
                {
                    l1.display();
                }
                datafile01.clear();
                cout<<endl;
            }

            else if(choice==2)
            {
                cout<<endl<<setw(10)<<"NAME"<<setw(20)<<"ADDRESS"<<setw(20)<<"EMAIL_ID"<<setw(20)<<"CONTACT NO"<<setw(20)<<"PASSWORD"<<setw(20)<<"AGE"<<endl;
                login_signup l1;
                secdatafile.seekg(0,ios::beg);
                while(secdatafile.read((char*)&l1,sizeof(l1)))
                {
                    l1.display();
                }
                secdatafile.clear();
                cout<<endl;
            }
        }



};

class onlineshop
{
    protected:  
                    char item[20],clothing[20],elctronics[20],shoes[20],books[20];
                    char type[20];
                    float price,final_price,discount_per,discount_amo;
                    int item_no;

    public:

                void getdata()
                {
                    cout<<"Enter type of item from clothing/electronic/shes/books: "<<endl;
                    cin>>type;

                    cout<<"Enter name of item: "<<endl;
                    cin>>item;

                    cout<<"Enter price of the "<<type<<" type  "<<item<<" please: "<<endl;
                    cin>>price;

                    cout<<"Enter no of "<<type<<" type "<<item<<" items"<<endl;
                    cin>>item_no;

                    cout<<"Enter discount percentage of given item "<<endl;
                    cin>>discount_per;
                }
                    void discount_cal()
                    {
                        discount_amo=(price*discount_per)/100;
                        final_price=price-discount_amo;
                        
                    }
                   void display_record()
                   {
                    cout<<endl<<setw(10)<<type<<setw(20)<<item<<setw(20)<<item_no<<setw(20)<<price<<setw(20)<<discount_per<<setw(20)<<discount_amo<<setw(20)<<final_price<<endl;
                   }
                  void modify_price(float price1)
                  {
                    price=price1;
                  }
                  void modify_dis_per(float percentage)
                  {
                    discount_per=percentage;
                  }
                  void modify_dis_amo(float percentage,float price1)
                  {
                    discount_amo=(price1*percentage)/100;
                  }
                  void modify_final_price(float price1)
                  {
                    final_price=price1-discount_amo;
                  }

                  void modify_itemno(int itemno1)
                  {
                    item_no=itemno1;
                  }
                    void modifyitem_no(int no_item)
                   {
                        item_no=item_no-no_item;
                   }

                  string gettype(){return type;};
                  string getitem(){return item;};
                  float getprice(){return price;};
                  float getdiscount_per(){return discount_per;};
                  float getfinal_price(){return final_price;};
                  float getdiscount_amo(){return discount_amo;};
                  int getitem_no(){return item_no;};
                   

};

class admini_operatios:public onlineshop
{  
     public:
        fstream datafile02;
    
           admini_operatios(char*filename)    // constructor to directly open file;
           {
            datafile02.open(filename,ios::in|ios::out|ios::ate|ios::binary);
           }

           
           void insertrecord()
           {
            onlineshop s1;
            s1.getdata();
            s1.discount_cal();
            datafile02.seekp(0,ios::end); // to indicate at the end of alredy existed text in file
            datafile02.write((char*)&s1,sizeof(s1));
            datafile02.clear();
           }

           void displayall()
           {
            onlineshop s1;
            datafile02.seekg(0,ios::beg);
            cout<<"\nItem record is given as : "<<endl;
            cout<<endl<<setw(10)<<"TYPE OF ITEM"<<setw(20)<<"ITEM"<<setw(20)<<"   No OF AVALIABLE ITEM"<<setw(20)<<"PRICE"<<setw(20)<<"Discount %"<<setw(20)<<"Discount Amount"<<setw(20)<<"Final Price"<<endl;
            while(datafile02.read((char*)&s1,sizeof(s1)))
            {
                s1.display_record();
            }
            datafile02.clear();
            cout<<endl;
           }

           void displatbytype()
           {
                char type1[20];
                cout<<"Enter the type of item you want to see:"<<endl;
                cin>>type1;
                onlineshop s1;
                datafile02.seekg(0,ios::beg);
                bool flag=false;
                while(datafile02.read((char*)&s1,sizeof(s1)))
                {
                    if(type1==s1.gettype())
                    {
                        cout<<endl<<setw(10)<<"TYPE OF ITEM"<<setw(20)<<"ITEM"<<setw(20)<<"   No OF AVALIABLE ITEM"<<setw(20)<<"PRICE"<<setw(20)<<"Discount %"<<setw(20)<<"Discount Amount"<<setw(20)<<"Final Price"<<endl;
                        s1.display_record();
                        
                        flag=true;
                        
                    }

                }

                if(flag==false)
                {
                    cout<<"\nData of "<<type<<" item is not available"<<endl;
                }
                datafile02.clear();
           }


         void deleteitem()
           {
            char item1[20];
            cout<<"Enter name of item you want to delete: "<<endl;
            cin>>item1;

            ofstream outfile("temperary.dat",ios::binary);
            datafile02.seekg(0,ios::beg);
            bool flag=false;
            onlineshop s1;
            while(datafile02.read((char*)&s1,sizeof(s1)))
            {
                if(s1.getitem()==item1)
                {
                    
                    flag=true;
                    cout<<"Data of "<<item1<<" has been Sucessfully removed:\n";
                    continue;
                    
                }
                else
               outfile.write((char*)&s1,sizeof(s1)); 
            }
                
                outfile.close();
                 datafile02.close();
                datafile02.open("administrator.dat",ios::in|ios::out|ios::trunc|ios::binary);

                onlineshop s2;
                ifstream infile("temperary.dat",ios::binary);
                infile.seekg(0,ios::beg);
                while(infile.read((char*)&s2,sizeof(s2)))
                {
                    datafile02.write((char*)&s2,sizeof(s2));
                }
                infile.close();
                
                datafile02.clear(); // to again clear all operation and point towards from start of file;
                
            if(flag==false)
            {
                cout<<"Data of given item doesnot exist:\n";
            }
            
           }

           void modify_price()
           {
                char item2[20];
                cout<<"Enter the name of item: "<<endl;
                cin>>item2;
                ofstream outfile("temperary.dat",ios::binary);
                datafile02.seekg(0,ios::beg);
                bool flag=false;
                onlineshop s1;
                 while(datafile02.read((char*)&s1,sizeof(s1)))
                {
                        if(s1.getitem()==item2)
                        { 
                            float price1,percentage;
                            int itemno1;

                            flag=true;
                            cout<<"Enter  new price of: "<<item2<<" "<<endl;
                            cin>>price1;
                            s1.modify_price(price1);
                            cout<<"Enter new discount percentage of : "<<item2<<endl;
                            cin>>percentage;

                            s1.modify_dis_per(percentage);

                            s1.modify_dis_amo(percentage,price1);
                            
                            s1.modify_final_price(price1);

                            cout<<"Enter new no of available items in stock: "<<endl;
                            cin>>itemno1;
                            s1.modify_itemno(itemno1);

                            outfile.write((char*)&s1,sizeof(s1));
                            cout<<"Data successfully modified: "<<endl;
                            
                        }
                    else
                outfile.write((char*)&s1,sizeof(s1)); 
                }

                
                if(flag==false)
                {
                    cout<<"Data of given prn doesnot exist:\n";
                }

                datafile02.close(); 
                outfile.close();
                
                datafile02.open("administrator.dat",ios::in|ios::out|ios::trunc|ios::binary);

                onlineshop s2;
                ifstream infile("temperary.dat",ios::binary);
                infile.seekg(0,ios::beg);
                while(infile.read((char*)&s2,sizeof(s2)))
                {
                    datafile02.write((char*)&s2,sizeof(s2));
                }
                infile.close();
                
                datafile02.clear(); // to again clear all operation and point towards from start of file;

           };


};

class customer:public onlineshop
{
    protected:
            char cus_name[20],billing_address[40];
            long long cus_contact;
            string TYPE;
            char ITEM[20];
            int ITEM_NO;
            float PRICE,FINAL_PRICE,DISCOUNT_PRICE,DISCOUNT_AMO;
         public:
                 void display_record_new()
                   {
                    cout<<endl<<setw(10)<<TYPE<<setw(20)<<ITEM<<setw(20)<<ITEM_NO<<setw(20)<<PRICE<<setw(20)<<DISCOUNT_PRICE<<setw(20)<<DISCOUNT_AMO<<setw(20)<<FINAL_PRICE<<endl;
                   };

                   void display_record()
                   {
                    cout<<endl<<setw(10)<<type<<setw(20)<<item<<setw(20)<<item_no<<setw(20)<<price<<setw(20)<<discount_per<<setw(20)<<discount_amo<<setw(20)<<final_price<<endl;
                   }
                
                void display_bill()
                {
                    get_cus_data();

                    cout<<"\n----------------------------------------------INVOICE---------------------------------"<<endl;
                    cout<<"BILL TO"<<endl;
                    cout<<"Customer Name:->"<<cus_name<<endl;
                    cout<<"Customer Address;->"<<billing_address<<endl;
                    cout<<"Contact no:->"<<cus_contact<<endl;
                    cout<<"---------------------------------------------------------------------------------------"<<endl;
                    cout<<"********************************** PAYMENT INFORMATION*********************************\n"<<endl;
                     cout<<endl<<setw(10)<<"TYPE OF ITEM"<<setw(20)<<"ITEM"<<setw(20)<<"   No OF AVALIABLE ITEM"<<setw(20)<<"PRICE"<<setw(20)<<"Discount %"<<setw(20)<<"Discount Amount"<<setw(20)<<"Final Price"<<endl;
                    display_record_new();
                   cout<<"------------------------------------------------------------------------------------------"<<endl;
                };

                void get_cus_data()
                {
                    cout<<"Please enter your information for invoice: "<<endl;
                    cout<<"Enter customer name: "<<endl;
                    cin>>cus_name;
                    cout<<"Enter billing address: "<<endl;
                    cin>>billing_address;
                    cout<<"Enter contact for delivery:"<<endl;
                    cin>>cus_contact;
                }

                    string get_item()
                    {
                        return item;
                    }


};

class cus_operations:public customer
{
 public:
        fstream datafile03;
           cus_operations(char*filename)    // constructor to directly open file;
           {
            datafile03.open(filename,ios::in|ios::out|ios::ate|ios::binary);
           };

           void displayall_items()
           {
            onlineshop s1;
            datafile03.seekg(0,ios::beg);
            cout<<"\nItem record is given as : "<<endl;
            cout<<endl<<setw(10)<<"TYPE OF ITEM"<<setw(20)<<"ITEM"<<setw(20)<<"   No OF AVALIABLE ITEM"<<setw(20)<<"PRICE"<<setw(20)<<"Discount %"<<setw(20)<<"Discount Amount"<<setw(20)<<"Final Price"<<endl;
            while(datafile03.read((char*)&s1,sizeof(s1)))
            {
                s1.display_record();
            }
            datafile03.clear();
            cout<<endl;
           }

            void buy_item()
            {
                
                string item_name;
                cout<<"Enter name of item you want to buy:"<<endl;
                cin>>item_name;
                ofstream outfile("temperary.dat",ios::binary);
                datafile03.seekg(0,ios::beg);
                bool flag=false;
                onlineshop s1;
                 while(datafile03.read((char*)&s1,sizeof(s1)))
                {
                        if(item_name==s1.getitem())
                        { 
                            int no_item;
                            flag=true;
                            cout<<"Enter no of item you want to buy:"<<endl;
                            cin>>no_item;
                            s1.modifyitem_no(no_item);
                            
                            outfile.write((char*)&s1,sizeof(s1));
                            cout<<"Data successfully modified: "<<endl;
                            
                        }
                    else
                outfile.write((char*)&s1,sizeof(s1)); 
                }

                
                if(flag==false)
                {
                    cout<<"Data of given item doesnot exist:\n";
                }

                datafile03.close(); 
                outfile.close();
                
                datafile03.open("administrator.dat",ios::in|ios::out|ios::trunc|ios::binary);

                onlineshop s2;
                ifstream infile("temperary.dat",ios::binary);
                infile.seekg(0,ios::beg);
                while(infile.read((char*)&s2,sizeof(s2)))
                {
                    datafile03.write((char*)&s2,sizeof(s2));
                }
                infile.close();
                
                datafile03.clear();
            }

                 void assign_item_data()
                {   

                    cout<<"ENter the name item which you buy:"<<endl;
                    cin>>ITEM;
                    onlineshop s1;
                    datafile03.seekg(0,ios::beg);
                    while(datafile03.read((char*)&s1,sizeof(s1)))
                    {
                         if(s1.getitem()==ITEM)
                         {
                            ITEM_NO=s1.getitem_no();
                            TYPE=s1.gettype();
                            PRICE=s1.getprice();
                            FINAL_PRICE=s1.getfinal_price();
                            DISCOUNT_PRICE=s1.getdiscount_per();
                            DISCOUNT_AMO=s1.getdiscount_amo();
                        }

                    }
                    datafile03.clear();
                    cout<<endl;

                }
};

int main()
{ 
    
    ofstream newfile("login&signup.dat",ios::app|ios::binary);
    newfile.close();

    ofstream newfile05("login&signup01.dat",ios::app|ios::binary);
    newfile05.close();

    ofstream newfile02("administrator.dat",ios::app|ios::binary);
    newfile02.close();

    admini_operatios obj2((char*)"administrator.dat");

    operations obj1((char*)"login&signup.dat",(char*)"login&signup01.dat");

    int choice=0;
     cout<<"\nPlease enter choice from given below: "<<endl;
    while(choice!=6)
    {
        cout<<"\n--------login operations--------"<<endl;
        cout<<"Choice 1: registration"<<endl;
        cout<<"Choice 2: Login"<<endl;
        cout<<"Choice 3: Deleting a Account\n";
        cout<<"Choice 4: Forgot Password\n";
        cout<<"Choice 5: display All Accounts\n";
        cout<<"Choice 6: exit\n";
        cin>>choice;

        switch(choice)
        {
            case 1:     cout<<"Please enter your details for registration:"<<endl;
                        obj1.registration();
                            break;
            case 2:
                        obj1.login();
                        
                        cout<<" login or not value "<<obj1.login_or_not;

                        if(obj1.administrator_or_not==1)
                        {
                            if(obj1.login_or_not==1)
                                {

                                    int select=0;
                                    cout<<"\nPlease enter choice from given below: "<<endl;
                                    while(select!=6)
                                    {
                                        cout<<"\n--------Administrator operations--------"<<endl;
                                        cout<<"Choice 1: Addition of items"<<endl;
                                        cout<<"Choice 2: display All together"<<endl;
                                        cout<<"Choice 3: Display all similar type item:\n";
                                        cout<<"Choice 4: Delete item\n";
                                        cout<<"Choice 5: modify information about any item\n";
                                        cout<<"Choice 6: exit\n";
                                        cin>>select;
                                        switch(select)
                                        {
                                            case 1:
                                                        obj2.insertrecord();
                                                        break;

                                            case 2:
                                                        obj2.displayall();
                                                        break;
                                            
                                            case 3:

                                                        obj2.displatbytype();
                                                        break;
                                            case 4: 

                                                        obj2.deleteitem();
                                                        break;

                                            case 5: 
                                                        obj2.modify_price();
                                                        break;
                                            case 6:
                                                        break;
                                        }
                        }
        



                             }

                                else
                                {
                                    cout<<"please login again correctly:"<<endl;
                                }
                        }
                       
                       else if(obj1.administrator_or_not==0)
                       {

                        if(obj1.login_or_not==1)
                        {
                            cus_operations obj3((char*)"administrator.dat");
                            obj3.displayall_items();
                            obj3.buy_item();
                            obj3.assign_item_data();
                            obj3.display_bill();
                        }

                        else
                        {
                            cout<<"please login again correctly:"<<endl;
                        }

                       }

                        else
                        {
                            cout<<"Please login again correctly:"<<endl;
                        }
                            break;
            case 3:         
                        obj1.deleteaccount();
                        break;
            case 4:
                        obj1.forgotpassword();
                        break;
            case 5:     
                        obj1.display();
                            break;

            case 6:       break;
        }

    
    }

    return 0;
}
`;

export function GetKey() {

    const sendData = async () => {
        try{
            const res = await axios.post(`${backendUrl}/docs/process`, {
                    codebase : message
                }
            );

            console.log(res.data);
    } catch(error){
        console.log(error);

    }

    }
    const [apiKey, setApiKey] = useState('');
    return (
        <div className="bg-slate-600 flex flex-row justify-center w-screen h-screen">
            <div className="bg-white p-10">
                <h1 className="text-5xl">GET YOUR API KEY</h1>
                <p>Follow the steps to get your API key</p>
                <ol>
                    <li><b> Create an Account on Mistral AI </b></li>
                    <ol>
                        
                        <li>Go to OpenRouter<a href="https://openrouter.ai/" target="_blank">click here</a></li>
                        <li>Click on "Sign Up"</li>
                        <li>Register using Google or Email & Password</li>
                    </ol>

                    <br /><br />

                    <li><b>Access API Key</b></li>
                    <ol>
                        <li>After logging in, navigate to the API Keys section:</li>
                        <ul>
                            <li>Click on your profile (top-right corner)</li>
                            <li>Select "API Keys"</li>
                        </ul>
                        <li>Click on "Generate New API Key"</li>
                        <li>Copy the generated API key (you won’t be able to see it again later).</li>
                    </ol>
                    <br /><br />
                    <li><b>Generate & Copy Your API Key</b></li>
                    <ol>
                        <li>Give your API key a name (e.g., "MyApp Key").</li>
                        <li>Click Generate.</li>
                        <li>Once generated, copy the API key. <br></br>⚠️ Important: You won’t be able to see it again, so save it securely.</li>
                    </ol>
                    <br /><br />
                    <li>Provide Your API Key in Our App</li>
                    <p>please enter your api key in the input field and click submit</p>
                </ol>
                <br /><br />
                <input className=" rounded-sm border border-slate-700" 
                    placeholder="Enter your API key here"
                    onChange={(e) => {
                    setApiKey(e.target.value);
                }} />
                <br /><br />
                <button onClick={sendData}>Submit</button>
            </div>


        </div>
    )
}