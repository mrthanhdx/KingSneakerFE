

function HomePage({setStateForm}){
    return (
        <>
        <h1>home page sell shoses online</h1>
        <button style={{margin:"10px"}} onClick={()=>{
            setStateForm("login");
        }} className="btn btn-primary">Login</button>
        <button style={{margin:"10px"}} className="btn btn-dark">Logout</button>
        </>
    )
}

export default HomePage;