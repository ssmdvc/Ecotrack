import { useState, useEffect } from "react"
import { initializeApp } from "firebase/app"
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import "./SchedulePage.scss"

const firebaseConfig = {
  apiKey: "AIzaSyAafMRXyF5aQVXGA6vjk_arexvq1Mf2Xkw",
  authDomain: "ecotrack-web-panel.firebaseapp.com",
  projectId: "ecotrack-web-panel",
  storageBucket: "ecotrack-web-panel.appspot.com",
  messagingSenderId: "879072790810",
  appId: "1:879072790810:web:8a510c63c94958365904a3",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)

function SchedulePage() {
  const [date, setDate] = useState(new Date())
  const [drivers, setDrivers] = useState([])
  const [schedules, setSchedules] = useState([])
  const [showAddDriverForm, setShowAddDriverForm] = useState(false)
  const [showAddScheduleForm, setShowAddScheduleForm] = useState(false)
  const [newDriver, setNewDriver] = useState({ name: "", id: "" })
  const [newSchedule, setNewSchedule] = useState({
    status: "Pending",
    truckId: "",
    driver: "",
    route: "",
    estimatedTime: "",
  })

  useEffect(() => {
    const driversRef = ref(database, "drivers")
    const schedulesRef = ref(database, "schedules")

    onValue(driversRef, (snapshot) => {
      const data = snapshot.val()
      const driversList = data
        ? Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }))
        : []
      setDrivers(driversList)
    })

    onValue(schedulesRef, (snapshot) => {
      const data = snapshot.val()
      const schedulesList = data
        ? Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }))
        : []
      setSchedules(schedulesList)
    })
  }, [])

  const addDriver = async () => {
    if (newDriver.name && newDriver.id) {
      const driversRef = ref(database, "drivers")
      await push(driversRef, newDriver)
      setNewDriver({ name: "", id: "" })
      setShowAddDriverForm(false)
    }
  }

  const addSchedule = async () => {
    if (newSchedule.truckId && newSchedule.driver && newSchedule.route && newSchedule.estimatedTime) {
      const schedulesRef = ref(database, "schedules")
      await push(schedulesRef, {
        ...newSchedule,
        date: date.toISOString().split("T")[0],
      })
      setNewSchedule({
        status: "Pending",
        truckId: "",
        driver: "",
        route: "",
        estimatedTime: "",
      })
      setShowAddScheduleForm(false)
    }
  }

  const deleteSchedule = async (scheduleId) => {
    const scheduleRef = ref(database, `schedules/${scheduleId}`)
    await remove(scheduleRef)
  }

  const renderCalendar = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay()

    const days = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), i)
      const isSelected = currentDate.toDateString() === date.toDateString()
      const isToday = currentDate.toDateString() === new Date().toDateString()
      days.push(
        <div
          key={`day-${i}`}
          className={`calendar-day ${isSelected ? "selected" : ""} ${isToday ? "today" : ""}`}
          onClick={() => setDate(currentDate)}
        >
          {i}
        </div>,
      )
    }

    return (
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))}>&lt;</button>
          <div>
            {monthNames[date.getMonth()]} {date.getFullYear()}
          </div>
          <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))}>&gt;</button>
        </div>
        <div className="calendar-days">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          {days}
        </div>
      </div>
    )
  }

  return (
    <div className="schedule-container">
      <h1>Schedule Management</h1>
      <div className="content">
        <div className="main-content">
          <div className="card">
            <div className="card-header">
              <h2>Today's Schedule - {date.toLocaleDateString("en-US", { day: "2-digit", month: "short" })}</h2>
              <button onClick={() => setShowAddScheduleForm(!showAddScheduleForm)}>
                {showAddScheduleForm ? "Cancel" : "Add New"}
              </button>
            </div>
            {showAddScheduleForm && (
              <div className="add-form">
                <input
                  type="text"
                  placeholder="Truck ID"
                  value={newSchedule.truckId}
                  onChange={(e) => setNewSchedule({ ...newSchedule, truckId: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Driver"
                  value={newSchedule.driver}
                  onChange={(e) => setNewSchedule({ ...newSchedule, driver: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Route"
                  value={newSchedule.route}
                  onChange={(e) => setNewSchedule({ ...newSchedule, route: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Estimated Time"
                  value={newSchedule.estimatedTime}
                  onChange={(e) => setNewSchedule({ ...newSchedule, estimatedTime: e.target.value })}
                />
                <button onClick={addSchedule}>Add Schedule</button>
              </div>
            )}
            <table>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Truck ID</th>
                  <th>Driver</th>
                  <th>Route</th>
                  <th>Estimated Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {schedules
                  .filter((schedule) => schedule.date === date.toISOString().split("T")[0])
                  .map((schedule) => (
                    <tr key={schedule.id}>
                      <td>{schedule.status}</td>
                      <td>{schedule.truckId}</td>
                      <td>{schedule.driver}</td>
                      <td>{schedule.route}</td>
                      <td>{schedule.estimatedTime}</td>
                      <td>
                        <button onClick={() => deleteSchedule(schedule.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="card">
            <h2>Weekly Schedule</h2>
            <table>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Schedules</th>
                </tr>
              </thead>
              <tbody>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
                  const currentDate = new Date(date)
                  currentDate.setDate(
                    date.getDate() - date.getDay() + ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(day),
                  )
                  const dateString = currentDate.toISOString().split("T")[0]
                  const daySchedules = schedules.filter((schedule) => schedule.date === dateString)

                  return (
                    <tr key={day}>
                      <td>{day}</td>
                      <td>
                        {daySchedules.map((schedule, index) => (
                          <div key={index}>
                            {schedule.truckId}: {schedule.route}
                          </div>
                        ))}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="sidebar">
          <div className="card">{renderCalendar()}</div>

          <div className="card">
            <div className="card-header">
              <h2>Drivers</h2>
              <button onClick={() => setShowAddDriverForm(!showAddDriverForm)}>
                {showAddDriverForm ? "Cancel" : "Add Driver"}
              </button>
            </div>
            {showAddDriverForm && (
              <div className="add-form">
                <input
                  type="text"
                  placeholder="Driver Name"
                  value={newDriver.name}
                  onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Driver ID"
                  value={newDriver.id}
                  onChange={(e) => setNewDriver({ ...newDriver, id: e.target.value })}
                />
                <button onClick={addDriver}>Add Driver</button>
              </div>
            )}
            <div className="driver-list">
              {drivers.map((driver) => (
                <div key={driver.id} className="driver-item">
                  <div className="avatar">
                    <img src="/placeholder.svg" alt={driver.name} />
                  </div>
                  <div>
                    <div className="driver-name">{driver.name}</div>
                    <div className="driver-id">{driver.id}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchedulePage;
