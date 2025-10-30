# Exam Result Notification System

A lightweight React + Vite app for searching and managing student exam results with Supabase as the backend.

## Deployed Website
You can check the project at : [https://merry-match-nine.vercel.app/](https://score-board-amber.vercel.app/)

### Landing Page
![แจ้งคะแนน](https://github.com/user-attachments/assets/92528dff-97b8-4884-ace2-c44908151a51)

## ✨ Features
- Search results by 13-digit student code
- Scores table with pagination: Listening, Reading, Writing, Total, Passing Score, Test Level, Test Calendar, Notes, Saved By, Status
- Admin portal: login, import Excel/CSV template, auto-fill form, add exam results
- Supabase database integration: students, courses, exam_results, admins
- Tailwind CSS UI

## 🧱 Tech Stack
- React 19, Vite
- React Router DOM
- Tailwind CSS 4
- Supabase (Auth + PostgreSQL)
- xlsx (Excel), file-saver
- bcryptjs (admin password checks)
