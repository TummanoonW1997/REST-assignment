# REST-assignment
 
## เครื่องมือที่ใช้
1. Node.js 
2. Express.js
3. AceBase (nonSQL filebased database)
4. uuid
5. dotenv
6. nodemon

Note: PORT ตั้งค่าที่ไฟล์ .env (ค่าเริ่มต้น 4000)

## วิธีการติดตั้ง
ให้เปิด Terminal โดย cd ไปที่ directory ของโปรเจค จากนั้นใช้คำสั่ง
```
npm install
```

## วิธี run
ใช้คำสั่ง
```
npm start
```
or
```
npm run start
```

## การทดสอบยิง Request ไปยัง API
1. ใช้โปรแกรม POSTMan แล้วทำการ import ไฟล์ [api-template.postman_collection.json](api-template.postman_collection.json)


## โครงสร้างการจัดเก็บโค้ดใน directory [src](src/)
1. [agents](src/agents/) : เก็บ module ต่างๆที่เป็น logic และ operation 
2. [models](src/models/) : เก็บโครงสร้างข้อมูลที่เกี่ยวข้องกับโปรเจค
3. [routes](src/routes/) : เก็บ module ต่างๆที่เป็น router
4. [index.ts](src/index.ts) : ไฟล์ตัวรัน application


