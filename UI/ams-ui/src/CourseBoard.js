import React, { useRef, useState, useEffect } from 'react'
import Board from 'react-trello'
import './CourseBoard.css'

function CourseBoard() {

  const [tickets, setTickets] = useState([])
  const fileRef = useRef();
  let eventBus = undefined

  const setEventBus = (handle) => {
    eventBus = handle
  }


  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  useEffect(() => {
    fetch(`http://localhost:3000/api/assignment/get_assignment_by_course/${localStorage.getItem("user_id")}`, {
      method: 'GET',
      //   mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(resData => {
        setTickets(resData.tickets)
      }).catch(error => console.log(error))
  }, [])


  const data = {
    lanes: [
      {
        id: 'lane1',
        title: 'To Do Assignments',
        style: { backgroundColor: 'white' },
        cards: [
          { id: 'Card1', title: 'ACS545', description: 'Lab 8: MD5 collision attack', label: '30mins' },
          { id: 'l1c2', title: 'ACS545', description: 'Lab 9', label: '5 mins', metadata: { sha: 'be312a1' } }
        ]
      },
      {
        id: 'lane2',
        title: 'In Progress',
        style: { backgroundColor: 'white' },
        cards: [
          { id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
          { id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: { sha: 'be312a1' } }
        ]
      },
      {
        id: 'lane3',
        title: 'Blocked',
        style: { backgroundColor: 'white' },
        cards: [
          { id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins' },
          { id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins' }
        ]
      },
      {
        id: 'lane4',
        style: { backgroundColor: 'white' },
        title: 'Completed',
        cards: []
      }
    ]
  }



  const dataChanged = (newData) => {
    fetch('http://localhost:3000/api/sendNewData', {
      method: 'POST',
      //   mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "tickets": newData })
    }).then(response => response.json())
      .then(resData => {
        setTickets(newData)
      }).catch(error => console.log(error))
  }



  const handleFileUpload = (e) => {
    const [file] = e.target.files;
    let base64OfFile = getBase64(file);

    console.log(base64OfFile);
    fetch('http://localhost:3000/api/sendFileData', {
      method: 'POST',
      //   mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "file": base64OfFile })
    }).then(response => response.json())
      .then(resData => {
        console.log("File sent!")
        eventBus.publish({type: 'MOVE_CARD', fromLaneId: 'lane1', toLaneId: 'lane4', cardId: 'l1c2', index: 0})
      }).catch(error => console.log(error))
  };


  const CustomCard = props => {
    return (
      <>
      <div className="card">
        <b className="propTitle">{props.title}</b>
        <b className="propLabel">{props.label}</b>
        <br />
        <p>{props.description}</p>
        <div>
          <button onClick={() => fileRef.current.click()}>
            Upload File(s)
          </button>
          <input
            ref={fileRef}
            onChange={handleFileUpload}
            multiple={false}
            type="file"
            hidden
          />
        </div>

      </div>
      </>
    );
  };

  const components = {
    Card: CustomCard
  };


  return (
    <>
    <h2>Hello! Welcome to your assignment board</h2>
    <Board
      data={data}
      onDataChange={dataChanged}
      components={components}
      collapsibleLanes
      laneDraggable
      style={{ backgroundColor: '#f1eeee' }}
      eventBusHandle={setEventBus}
    >

    </Board>
    </>
  )
}
export default CourseBoard