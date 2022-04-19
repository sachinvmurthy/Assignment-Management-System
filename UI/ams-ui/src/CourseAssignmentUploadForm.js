import React, { useEffect, useState } from 'react';
import './AssignmentFormUpload.css'
function FileUploadPage() {


    const [assignmentName, setAssignmentName] = useState('');
    const [courseId, setCourseId] = useState('');
    const [assignmentDescription, setAssignmentDescription] = useState('');
    const [courses, setCourses] = useState([])

    const [submitted, setSubmitted] = useState(false);

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
    const handleAssignmentName = (e) => {
        setAssignmentName(e.target.value);
        setSubmitted(false);
    };

    const handleCourseId = (e) => {
        setCourseId(e.target.value)

    };

    const handleAssignmentDescription = (e) => {
        setAssignmentDescription(e.target.value);
        setSubmitted(false);
    };


    // const changeHandler = (event) => {
    //     setSelectedFile(event.target.files[0]);
    //     setIsFilePicked(true);
    // };

    const handleSubmission = () => {
        const formData = new FormData();


        fetch('http://localhost:3000/api/assignment/create', {
            method: 'POST',
            //   mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"course_id": courseId, "assignment_name": assignmentName, "assignment_description": assignmentDescription})
        }).then(response => response.json())
            .then(resData => {
                localStorage.setItem("userId", resData.user.user_id)
                localStorage.setItem("isStudent", resData.user.student)
            }).catch(error => console.log(error))

    };

    return (

        <div className="Form">


            <label className="display-block">Assignment Name: </label>
            <input className="display-block" onChange={handleAssignmentName}
                value={assignmentName} type="text" />

            <label className="display-block">Course Id: </label>
            {/* <input className="display-block" onChange={}
                value={course_id} type="text" /> */}
            <select onChange={handleCourseId}>
                {courses.map((course) => {
                    <option value={course.name}>{course.name}</option> 
                })}
            </select>

            {/* <label className="display-block">Deadline: </label>
            <input className="display-block" onChange={handleName}
                value={userId} type="date" /> */}

            <div className="display-block" className="assignmentDescription">
                <label>
                    Assignment Description:
                </label>
                <div>
                <textarea onChange={handleAssignmentDescription} value={assignmentDescription}/>
                </div>
                
            </div>
            {/* <div className="inputFile">
                <input type="file" name="file" onChange={changeHandler} />
                {isFilePicked ? (
                    <div>
                        <p>Filename: {selectedFile.name}</p>
                        <p>Filetype: {selectedFile.type}</p>
                        <p>Size in bytes: {selectedFile.size}</p>
                        <p>
                            lastModifiedDate:{' '}
                            {selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                ) : (
                    <p>Select a file to show details</p>
                )}
            </div> */}
            <div>
                <button onClick={handleSubmission}>Submit</button>
            </div>
        </div>
    )
}

export default FileUploadPage;