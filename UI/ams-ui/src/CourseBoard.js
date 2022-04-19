import React, { useState, useEffect } from 'react'
import Board from 'react-trello'
function CourseBoard() {

  const [tickets, setTickets] = useState([])



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
        cards: [
          { id: 'Card1', title: 'ACS545', description: 'Lab 8: MD5 collision attack', label: '10th June, 2022' },
          { id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: { sha: 'be312a1' } }
        ]
      },
      {
        id: 'lane2',
        title: 'In Progress',
        cards: [
          { id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', draggable: false },
          { id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: { sha: 'be312a1' } }
        ]
      },
      {
        id: 'lane3',
        title: 'Blocked',
        cards: [
          { id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', draggable: false },
          { id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: { sha: 'be312a1' } }
        ]
      },
      {
        id: 'lane4',
        title: 'Completed',
        cards: []
      }
    ]
  }


  //GET api that gets the above data


  return (
    <Board data={data} />
  )
}
export default CourseBoard