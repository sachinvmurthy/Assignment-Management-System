import React, { useState, useEffect } from 'react'
import Base64Downloader from 'react-base64-downloader';
import "./ViewSubmissions.css"

function ViewSubmissions() {
    const [submissions, setSubmissions] = useState([])
    const [courses, setCourses] = useState([])
    const [base64, setBase64] = useState()

    useEffect(() => {
        fetch(`http://localhost:3001/api/courses/get_courses/${localStorage.getItem("userId")}`, {
            method: 'GET',
            //   mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(resData => {
                setCourses(resData.courses)
            }).catch(error => console.log(error))
    }, [])

    const handleCourseChange = e => {
        fetch(`http://localhost:3001/api/courses/get_assignments/${e.target.value}`, {
            method: 'GET',
            //   mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(resData => {
                setSubmissions(resData.courses)
            }).catch(error => console.log(error))
    }

    const handleDownload = (assignment_id) => {
        fetch(`http://localhost:3001/api/courses/get_assignments_data/${assignment_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(resData => {
                setBase64(resData.fileData)
            }).catch(error => console.log(error))
    }
    return (

        <>
            <select onChange={handleCourseChange}>
                {courses.map((course) => {
                    <option value={course.course_id}>{course.name}</option>
                })}
            </select>
            <div className="ViewSubmissions">
                <table className="AssignmentTable">
                    <tr>
                        <th>Assignment ID </th>
                        <th>Assignment Name </th>
                        <th>Student Name </th>
                        <th>Status </th>
                        <th>Files </th>
                    </tr>
                    {submissions.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.assignment_id}</td>
                                <td>{val.assignment_name}</td>
                                <td>{val.student_name}</td>
                                <td>{val.status}</td>
                                <td>
                                    <Base64Downloader base64={base64} downloadName="Assignment">
                                        Download Assignment
                                    </Base64Downloader>
                                </td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </>
    )
}
export default ViewSubmissions;