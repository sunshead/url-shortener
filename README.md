# url-shortener
A url shortening service built on MEAN stack

设计思路 
---
  网址转化规则：将长地址存储在数据库中并获取一个唯一对应的ID，将此ID用除K取余法转化为62进制数（62为0-9,a-z,A-Z的数字/字母总数），再以此过程中的每一位余数为Index去字母/数字表（即0-9,a-z,A-Z）中获取对应的字符，并将得到的字符连接成长度为5的字符串，作为最终结果返回。  
  项目架构：Node.js建立API，Express处理Http请求，AngularJS处理双向数据绑定，MongoDB存取Json文档。
数据库Schema  
---
  数据库中有ids和url两个collection：ids用于记录当前文档的序列号并将其作为该文档的id存入url中，之后将其+1（因为MongoDB不支持自增id）；url用于存储长地址和其对应的id。  
###### ids
| _id | num |
| ------------- | ------------- |
| "counter"  | 100000000  |

###### url
| _id | url | created_at|
| ------------- | ------------------- | ---------------- |
| 100000000     | https://liaoyuan.io | 2016-08-06 12:00 |

  
实例&运行  
---
  部署网址：[Heroku App](https://url-converter.herokuapp.com)  
  运行测试：将长地址粘贴在输入框中，点击"Submit"按钮，短地址将出现在按钮下方，单击可在新页面打开目标网页。
