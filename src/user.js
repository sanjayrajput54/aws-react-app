import { useEffect, useState } from "react";

const API ="http://localhost:3001/user"
function User() {
    const [formState, setFormState] = useState(null);
    const [userState, setUserState] = useState([
        {
            name:"Sanjay",
            mobile:"878798797"
        }
    ]);

    const fetchUser = async () => {
        try {
            const response = await fetch(API);
            const data = await response.json();
            console.log("data",data)
            setUserState(data?.users || []);
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState((preState) => ({
            ...preState,
            [name]: value
        }))

    }

    const handleSubmit = async () => {
        if(!formState) return;
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formState)
            };
            const response = await fetch(API,requestOptions);
            const data = await response.json();
            console.log("data",data)
            setUserState((preState)=>[...preState, {...formState}]);
            setFormState(null)
        } catch (err) {
            console.log(err)
        }
    }

    const renderUser = (user, index) => {

        return <div key={index}>
            {index === 0 && <>
                <div className="user-header">
                    <div className="item-min-width">Name</div><div className="item-min-width">Mobile</div>
                </div>
            </>}
            <div className="user-items">
                <div className="item-min-width">{user.name}</div><div className="item-min-width">{user.mobile}</div>
            </div>
        </div>
    }

    useEffect(()=>{
        fetchUser();
    },[])
    return (
        <div className="App">
            <div className="Container">
                <h1>Users:</h1>
                <div className="section-user-list">
                        {userState?.map((item, index) =>renderUser(item,index))}
                        {userState.length === 0 && <div>No data</div>}
                </div>
                <div className="section-user-form">

                        <input type="text" value={formState?.name || ""} name="name" onChange={handleChange} />
                        <input type="text" value={formState?.mobile || ""} name="mobile" onChange={handleChange} />
                        <input type="text" value={formState?.location || ""} name="location" onChange={handleChange} />
                        <button onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    );

}
export default User;
