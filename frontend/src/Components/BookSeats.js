import React, { useEffect, useState } from 'react'
import './Seats.css'

function BookSeats(props, getSeats) {

    const [seats, setSeats] = useState(" ");


    useEffect(() => {
        handleReservedSeats();
    })

    // this function is used to show the reserved seats to the client side.
    //if the seats are reserved grid box will turn into green from red.
    const handleReservedSeats = () => {

        // const seatsAvailable = props.valuee.map((data)=>{
        //     return data.seatsAvailable ;
        // });

        const reservedSeats = props.valuee.map((data) => {
            return data.reservedSeats.map((val) => {
                const htmlGridCollection = document.getElementsByClassName("grid_box");

                const htmlGridArray = [...htmlGridCollection];

                return htmlGridArray.forEach((el)=>{
                    if(el.innerText === val){
                        el.style.backgroundColor = "green";
                        return el
                    }
                })
            });
        })

        // const reserved = htmlGridArray.filter((el) => {

        //     const txt = el.innerText;
        //     console.log(typeof (txt))
        //     console.log(reservedSeats)
        //     console.log(typeof (reservedSeats[0]))
        //     console.log(reservedSeats.includes(txt))

        //     if (reservedSeats.includes(txt)) {
        //         //console.log(el + "h")
        //         return el

        //     }
        // });

    }


    // handleBooking function is used to reserved the seats,
    //this function updates the array of reserved seats in the mongodb database.
    const handleBooking = async (id, seats) => {

        if (seats === "") {
            alert("Empty Input Fields");
            return;
        }

        if(seats == 0){
            alert("Invalid Input");
            return;
        }

        if (seats > 7) {
            alert("You can reserve up to 7 seats at a time");
            return;
        }

        let len = props.valuee[0].reservedSeats.length;

        let availableSeats = 80 - len ;
        
        if(seats > availableSeats){
            alert(`${availableSeats} seats are available`);
            return;
        }
 
        let result = await fetch(`http://localhost:8000/reserve/${id}`, {
            method: "PUT",
            body: JSON.stringify({ start: len, reserve: seats }),
            headers: {
                'Content-Type': 'Application/json'
            }
        });

        result = await result.json();

        if (result) {
            props.getSeats();
        }

        setSeats("");

    }

    return (
        <>
            <div className='container'>
                {props.valuee.map((seat) => {
                    return (
                        <>
                            <div className='seat_section'>
                                {
                                    seat.seatsAvailable.map((data) => {
                                        return (
                                            <>
                                                <div className='grid_box' key={seat._id}>{data}</div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                            <div className='input'>
                                <input value={seats} onChange={(e) => { setSeats(e.target.value) }} type="number" min="1" max="7" />
                            </div>
                            <div className='confirm_button'>
                                <button onClick={() => handleBooking(seat._id, seats)} className='confirm_btn'>Confirm The Seat</button>
                            </div>
                        </>
                    )
                })
                }
            </div>
        </>
    )
}

export default BookSeats