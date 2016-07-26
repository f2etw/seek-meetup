# 貢獻指南 Contribution Guide

## 新增活動 (issue 方式)

1. [新增 issue](https://github.com/f2etw/seek-meetup/issues/new) 頁
2. 填寫完後將不需要的部份刪去(兩個斜線後的都拿掉)
3. 等人處理。

## 新增活動 (PR 方式)

0. 執行 `npm install` 以安裝自動化所需工具
1. 依照 [`ical-toolkit`](https://github.com/kushal-likhi/node-ical-toolkit) 的資料格式在 `./events/` 目錄下建立好活動資料的 yaml 檔
2. 執行 `npm start` 生成對應的 `.ics` 檔案於 `./ics/` 目錄下
3. 先自己加加看生成的 ics 能否順利加入 Google Calendar
4. commit & PR

## 許願功能

請先開 issue 討論。

*****

感謝你的支持與鼓勵~