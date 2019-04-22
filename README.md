# CMNN
## Cisco Meraki Network Names
Application to detect inconsistency on network names on Cisco Meraki reported on CSV exported file from Meraki Plataform.

- Screenshot before load CSV report
![relatorio_inconsistencias_cisco_meraki_001](https://user-images.githubusercontent.com/12129206/56477309-8fa12080-647a-11e9-813f-87681584cbe0.png)

- Screenshot after load CSV report
![relatorio_inconsistencias_cisco_meraki_002](https://user-images.githubusercontent.com/12129206/56477310-8fa12080-647a-11e9-82ba-b27b0db5162e.png)

Plataform: Javascript run from Mozilla Firefox (Because XSS)

Library: jquery.csv.js

Front-end: Bootstrap 4

Scenario: I have a Cisco Meraki plataform receiveing a lot of new networks added daily, the names can contains errors due human factor typing. So I developed this application to check CSV file downloaded every day from Cisco Meraki plataform and the my application checks for issues in the names. The names have some rules that need to be followed. After check the CSV by the application, a issue report is printed in PDF by Firefox Browser and needs to be correct the wrong names.

How to use: 
- First download the CSV file from Cisco Meraki plataform and put on CMMN\CSV folder.
- Load the index.html on Mozila Firefox, press the button _"Carregar"_ (Load) to analisys the CSV and show the inconsistencies.
- Press the button _"Imprimir"_ (Print) to print the inconsistencies generated in a PDF file format.

