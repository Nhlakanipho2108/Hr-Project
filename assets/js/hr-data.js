(function () {
  const STORAGE_KEY = "moderntech-hr-data";

  const defaultData = {
    employees: [
      {
        id: 1,
        firstName: "Ava",
        lastName: "Nkosi",
        department: "Software Development",
        role: "Frontend Developer",
        email: "ava.nkosi@moderntech.local",
        phone: "+27 82 100 1001",
        hireDate: "2021-03-14",
        salary: 42000,
        status: "Active"
      },
      {
        id: 2,
        firstName: "Liam",
        lastName: "Mthembu",
        department: "Quality Assurance",
        role: "QA Analyst",
        email: "liam.mthembu@moderntech.local",
        phone: "+27 82 100 1002",
        hireDate: "2020-11-01",
        salary: 36000,
        status: "Active"
      },
      {
        id: 3,
        firstName: "Noah",
        lastName: "Dlamini",
        department: "Customer Support",
        role: "Support Specialist",
        email: "noah.dlamini@moderntech.local",
        phone: "+27 82 100 1003",
        hireDate: "2019-07-19",
        salary: 30000,
        status: "Active"
      },
      {
        id: 4,
        firstName: "Mia",
        lastName: "Pillay",
        department: "Human Resources",
        role: "HR Officer",
        email: "mia.pillay@moderntech.local",
        phone: "+27 82 100 1004",
        hireDate: "2018-02-06",
        salary: 39000,
        status: "Active"
      }
    ],
    timeOffRequests: [
      {
        id: 1,
        employeeId: 2,
        type: "Annual Leave",
        startDate: "2026-07-08",
        endDate: "2026-07-12",
        reason: "Family event",
        status: "Pending"
      },
      {
        id: 2,
        employeeId: 3,
        type: "Sick Leave",
        startDate: "2026-06-20",
        endDate: "2026-06-21",
        reason: "Medical recovery",
        status: "Approved"
      }
    ],
    attendance: [
      { employeeId: 1, date: "2026-06-29", status: "Present" },
      { employeeId: 2, date: "2026-06-29", status: "Present" },
      { employeeId: 3, date: "2026-06-29", status: "Absent" },
      { employeeId: 4, date: "2026-06-29", status: "Present" },
      { employeeId: 1, date: "2026-06-30", status: "Present" },
      { employeeId: 2, date: "2026-06-30", status: "Present" },
      { employeeId: 3, date: "2026-06-30", status: "Present" },
      { employeeId: 4, date: "2026-06-30", status: "Present" },
      { employeeId: 1, date: "2026-07-01", status: "Present" },
      { employeeId: 2, date: "2026-07-01", status: "Late" },
      { employeeId: 3, date: "2026-07-01", status: "Present" },
      { employeeId: 4, date: "2026-07-01", status: "Present" }
    ],
    payslips: []
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function ensureSeeded() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
      return clone(defaultData);
    }

    try {
      const parsed = JSON.parse(raw);
      return {
        employees: parsed.employees || [],
        timeOffRequests: parsed.timeOffRequests || [],
        attendance: parsed.attendance || [],
        payslips: parsed.payslips || []
      };
    } catch (error) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
      return clone(defaultData);
    }
  }

  function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function getData() {
    return clone(ensureSeeded());
  }

  function resetData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return clone(defaultData);
  }

  function nextId(items) {
    return items.length ? Math.max.apply(null, items.map(function (item) { return item.id; })) + 1 : 1;
  }

  window.HRData = {
    getData: getData,
    saveData: saveData,
    resetData: resetData,
    nextId: nextId
  };
})();
