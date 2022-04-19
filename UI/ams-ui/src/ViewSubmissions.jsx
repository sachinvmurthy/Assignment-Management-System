import React, { useState, useEffect } from 'react'

function ViewSubmissions() {
    const [submissions, setSubmissions] = useState([])
    const [courses, setCourses] = useState([])


    useEffect(() => {
        fetch(`http://localhost:3000/api/courses/getCourses/${localStorage.getItem("user_id")}`, {
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
        fetch(`http://localhost:3000/api/courses/get_assignments/${e.target.value}`, {
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


    return (

        <>
            <select onChange={handleCourseChange}>
                {courses.map((course) => {
                    <option value={course.course_id}>{course.name}</option>
                })}
            </select>
            <div className="ViewSubmissions">
                <table>
                    <tr>
                        <th>Assignment Id</th>
                        <th>Assignment Name</th>
                        <th>Student Name</th>
                        <th>Status</th>
                        <th>Files</th>
                    </tr>
                    {submissions.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.assignment_id}</td>
                                <td>{val.assignment_name}</td>
                                <td>{val.student_name}</td>
                                <td>{val.status}</td>
                                <td>{val.files}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </>
    )
}
export default ViewSubmissions;