<script setup>
import { computed, reactive, ref, watch } from 'vue'
import employeeInfoData from '../employee_info.json'
import attendanceData from '../attendance.json'
import payrollData from '../payroll_data.json'

const STORAGE_KEY = 'moderntech-hr-poc-state-v2'
const AUTH_USER = 'hr_admin'
const AUTH_PASSWORD = 'MT2026!' 

function parseStartDateFromHistory(employmentHistory) {
  const yearMatch = /Joined in\s+(\d{4})/i.exec(employmentHistory ?? '')
  if (!yearMatch) {
    return '2020-01-01'
  }
  return `${yearMatch[1]}-01-01`
}

const importedEmployees = (employeeInfoData.employeeInformation ?? []).map((employee) => ({
  id: employee.employeeId,
  name: employee.name,
  email: employee.contact,
  department: employee.department,
  role: employee.position,
  salary: Number(employee.salary) * 12,
  startDate: parseStartDateFromHistory(employee.employmentHistory),
  history: employee.employmentHistory
}))

const importedAttendance = (attendanceData.attendanceAndLeave ?? []).map((employeeRecord) => ({
  employeeId: employeeRecord.employeeId,
  present: employeeRecord.attendance.filter((entry) => entry.status === 'Present').length,
  remote: employeeRecord.attendance.filter((entry) => entry.status === 'Remote').length,
  absent: employeeRecord.attendance.filter((entry) => entry.status === 'Absent').length,
  leaveDays: employeeRecord.leaveRequests.filter((entry) => entry.status === 'Approved').length
}))

const importedLeaveRequests = []
let leaveRequestId = 1

for (const employeeRecord of attendanceData.attendanceAndLeave ?? []) {
  for (const leaveRequest of employeeRecord.leaveRequests ?? []) {
    importedLeaveRequests.push({
      id: leaveRequestId,
      employeeId: employeeRecord.employeeId,
      startDate: leaveRequest.date,
      endDate: leaveRequest.date,
      reason: leaveRequest.reason,
      status: leaveRequest.status
    })
    leaveRequestId += 1
  }
}

const importedPayrollSource = (payrollData.payrollData ?? []).map((payrollEntry) => ({
  employeeId: payrollEntry.employeeId,
  hoursWorked: payrollEntry.hoursWorked,
  leaveDeductions: payrollEntry.leaveDeductions,
  finalSalary: payrollEntry.finalSalary
}))

const importedPayslips = importedPayrollSource.map((payrollEntry, index) => ({
  id: Date.now() + index,
  month: 'Imported Dataset',
  employeeId: payrollEntry.employeeId,
  baseMonthly: payrollEntry.finalSalary,
  overtimeHours: Math.max(0, payrollEntry.hoursWorked - 160),
  overtimePay: Math.max(0, payrollEntry.hoursWorked - 160) * 180,
  taxDeduction: payrollEntry.finalSalary * 0.18,
  pensionDeduction: payrollEntry.finalSalary * 0.06,
  leaveDeductionAmount: payrollEntry.leaveDeductions * 180,
  netPay: payrollEntry.finalSalary - payrollEntry.finalSalary * 0.18 - payrollEntry.finalSalary * 0.06
}))

const activeTab = ref('dashboard')
const authRole = ref('guest')
const loginError = ref('')
const selectedPayrollEmployeeId = ref(importedEmployees[0]?.id ?? 1)
const selectedPayrollMonth = ref('June 2026')
const employeeLoginError = ref('')
const employeeSessionId = ref(null)
const selectedEmployeeId = ref(null)
const employeeWorkMode = ref('On Site')
const employeeClockMessage = ref('')
const employeeClockMessageType = ref('info')

const loginForm = reactive({
  username: '',
  password: ''
})

const employeeLoginForm = reactive({
  employeeId: importedEmployees[0]?.id ?? 1,
  email: ''
})

const employeeForm = reactive({
  name: '',
  email: '',
  department: '',
  role: '',
  salary: '',
  startDate: ''
})

const leaveForm = reactive({
  employeeId: importedEmployees[0]?.id ?? 1,
  startDate: '',
  endDate: '',
  reason: ''
})

const reviewForm = reactive({
  employeeId: importedEmployees[0]?.id ?? 1,
  period: '',
  rating: 3,
  summary: ''
})

const employeeEditForm = reactive({
  name: '',
  email: '',
  department: '',
  role: '',
  salary: '',
  startDate: '',
  history: ''
})

const state = reactive({
  employees: importedEmployees,
  leaveRequests: importedLeaveRequests,
  attendance: importedAttendance,
  attendanceLogs: [],
  performanceReviews: [
    {
      id: 1,
      employeeId: importedEmployees[0]?.id ?? 1,
      period: 'Q2 2026',
      rating: 4.7,
      summary: 'Excellent delivery pace and mentoring impact.'
    },
    {
      id: 2,
      employeeId: importedEmployees[1]?.id ?? 2,
      period: 'Q2 2026',
      rating: 4.5,
      summary: 'High defect prevention score in sprint releases.'
    },
    {
      id: 3,
      employeeId: importedEmployees[2]?.id ?? 3,
      period: 'Q2 2026',
      rating: 4.2,
      summary: 'Improved ticket closure by 16 percent.'
    }
  ],
  payrollSource: importedPayrollSource,
  generatedPayslips: importedPayslips
})

const employeeValidationErrors = computed(() => {
  const errors = []

  if (!employeeForm.name.trim()) {
    errors.push('Employee name is required.')
  }
  if (!/^\S+@\S+\.\S+$/.test(employeeForm.email.trim())) {
    errors.push('A valid work email is required.')
  }
  if (!employeeForm.department.trim()) {
    errors.push('Department is required.')
  }
  if (!employeeForm.role.trim()) {
    errors.push('Role is required.')
  }
  if (!Number(employeeForm.salary) || Number(employeeForm.salary) < 120000) {
    errors.push('Salary must be at least R120,000.')
  }
  if (!employeeForm.startDate) {
    errors.push('Start date is required.')
  }

  return errors
})

const leaveValidationErrors = computed(() => {
  const errors = []

  if (!leaveForm.startDate || !leaveForm.endDate) {
    errors.push('Start and end date are required.')
  }
  if (leaveForm.startDate && leaveForm.endDate && leaveForm.startDate > leaveForm.endDate) {
    errors.push('End date must be on or after start date.')
  }
  if (!leaveForm.reason.trim()) {
    errors.push('Please provide a short leave reason.')
  }

  return errors
})
</script>

<template>
</template>