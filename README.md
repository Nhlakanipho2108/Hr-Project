# ModernTech HR Front-End Proof of Concept

This project is a front-end-only HR system prototype for ModernTech Solutions.
It demonstrates how HR operations can be centralized and managed through a responsive web interface using dummy data and client-side logic.

## Tech Stack

- Vue 3 (CDN)
- Bootstrap 5 (CDN)
- Chart.js (attendance visualization)
- Browser localStorage for dummy data persistence

## Implemented Modules

- Mock authentication (hardcoded credentials)
- Employee data management (add, edit, delete)
- Time off request submission and approval workflow
- Attendance tracking and chart-based reporting
- Payroll processing and digital payslip generation

## Demo Login

- Username: `hradmin`
- Password: `hr@1234`

## Pages

- `login.html`: Login page
- `index.html`: Dashboard and employee management
- `Attendance.html`: Attendance and leave management
- `payroll.html`: Payroll and digital payslips

## Run the Project

1. Open the folder in VS Code.
2. Start with `login.html` using Live Server or any static server.
3. Login and navigate between modules using page links.

## Team Branch Structure

Create and use these branches for team collaboration:

- `nhlakanipho-dev`
- `lukhos-work`
- `khanya-dev`
- `Phelisa/dev`

Suggested ownership:

- `nhlakanipho-dev`: Dashboard and employee management
- `lukhos-work`: Attendance and time off workflows
- `khanya-dev`: Payroll and payslip features
- `Phelisa/dev`: Authentication, integration, responsive polishing, QA