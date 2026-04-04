# Durataljoud Dashboard - Backend

دليل التشغيل للمشروع (Back-end)

## 1. التحضيرات الأولية

1. على السيرفر (مثال من CloudPanel): `/home/..../....`

2. ثبّت الحزم:
   - `npm install`

3. أنشئ ملف `.env` في نفس المجلد (لو مش موجود) وانسخ/عدل المتغيرات:
   ```ini
   PORT=3000
   MONGO_URI=<mongodb-uri>
   JWT_SECRET=<secret>
   JWT_EXPIRES_IN=1d
   

### تشغيل المشروع عبر PM2

1. في مجلد المشروع (backend):

   npm install
   pm2 start index.js --name durataljoud-back --env production
   ```

2. ضبط `PORT` عند تشغيل (مهم لكل سيرفر):  
     pm2 start index.js --name durataljoud-back --env production
    

3. تغيير البورت في PM2 بدون إعادة تثبيت:
  
   pm2 restart durataljoud-back --update-env


4. عرض حالة الـ apps:
  
   pm2 list
   pm2 logs durataljoud-back
   pm2 status durataljoud-back
   ```

### حفظ إعدادات PM2 بعد إعادة تشغيل السيرفر


pm2 save
pm2 startup



## 5. أهمية `npm i` في البداية

- أي تغيير في الكود أو تسليم سيرفر جديد (clean deploy) يتطلب إعادة تثبيت الحزم:
  - `npm install`
- هذا الأمر يضمن وجود كل dependencies المطلوبة للعمل.


## 6. قسم المشاكل الشائعة

- خطأ `EADDRINUSE`: معناها البورت مستخدم. غيّر `PORT` أو أوقف الخدمة اللي على نفس البورت.


> مهم: لا تقم بنسخ `node_modules` بين الأجهزة، لأنها تعتمد على المنصة، وبدلًا من ذلك اعتمد `npm install` بعد نقل الكود.

> ✅ بهذه الخطوات يشتغل السيرفر على آخر نسخة من المشروع بدون تعارض مع نسخة سابقة أو ملفات قديمة.