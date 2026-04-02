
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [name,setname] = useState("");
  const [email1,setemail1] = useState("");
  //const [edittext,setedittext] = useState("");
  const [editId,seteditId] = useState("");
  
  const [store,setstore] = useState([])
  const [id1] = useState(0);
   const url = "https://jsonplaceholder.typicode.com/users";
   const getuser = async () => {
    try{
      
    
    const response = await fetch(url)
    const data = await response.json()

    //setstore(Array.isArray(data) ? data : [])
    setstore(data)
    }
    catch (error) {
    console.log("Fetch error:", error);
  }
  }

    useEffect(()=>{
      getuser()
    },[])
    console.log("store",store)
    console.log("length",store.length)
   
    const savefun=async()=>{
      const len =store.length>0?store[store.length-1].id +1:1;
      console.log("lenght",len)
      const userchange ={
        id:store.length>0?store[store.length-1].id +1:1,
        name,
        email:email1
      }
      
      const response =await fetch(url,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(userchange),
      })
      await response.json();
      setstore([...store,userchange])
     // setid1(store.length+1)
      console.log("lenght",id1)
      setname("")
      setemail1("")
    }

    const editedfun =(val)=>{
      setname(val.name);
      setemail1(val.email)
     
      seteditId(val.id);
    }

    const updatedfun =async()=>{

      const changefun ={
        name:name,
        email:email1
      }

      const response =await fetch(`${url}/${editId}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(changefun)
      })

       await response.json()
      console.log("data",changefun,"edit",editId)
      const res =store.map(e=>e.id===editId?{...e,...changefun}:e)
      setstore(res)
      console.log("storedata",store)
      setname("")
      setemail1("")
      seteditId(null)
     
    }

    const deletfun =(id)=>{
      console.log("id",id)
      fetch(`${url}/${id}`,{
        method:'DELETE',

      })
    // const newuser = response.json();
      setstore(store.filter(e=>e.id !== id))
      setname("")
    }

  return (
    // <div className="min-h-screen text-center bg-orange-200">
    //   <input className='text-xl m-3' type="text" value={name} placeholder='enter the name' onChange={(e)=>setname(e.target.value)} />
    //   <input className='text-xl m-3' type="text" value={email1} placeholder='enter the name' onChange={(e)=>setemail1(e.target.value)} />
    //  {editId ?(<button className='w-[90px] h-[27px] text-green-300 text-lg bg-blue-500' onClick={updatedfun}>updated</button>):(<button className='w-[90px] h-[27px] text-green-300 text-lg bg-blue-500' onClick={savefun}>Add</button>)}
    //   <table className='border '>
    //     <thead className='border bg-yellow-400'>
    //       <tr >
    //         <th>Sr.no</th>
    //         <th>Name</th>
    //         <th>Email</th>
    //         <th>Action</th>
    //       </tr>
    //     </thead>
    //     <tbody className='border'>
    //       {Array.isArray(store) && store.map(val=>(
    //         <tr  key={val.id}>
    //           <td className='border '>{val.id}</td>
    //           <td className='border'>{val.name}</td>
    //           <td className='border'>{val.email}</td>
    //           <td className='border'><button onClick={()=>deletfun(val.id)}>delete</button>/
    //           <button onClick={()=>editedfun(val)}>updated</button></td>
    //         </tr>
    //       ))}
          
    //     </tbody>
    //   </table>
      
      
    // </div>

    <div className="min-h-screen bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center p-6">
  
  <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-3xl">

    <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
      User Management
    </h1>

    {/* Inputs */}
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <input
        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        value={name}
        placeholder="Enter Name"
        onChange={(e) => setname(e.target.value)}
      />

      <input
        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        value={email1}
        placeholder="Enter Email"
        onChange={(e) => setemail1(e.target.value)}
      />

      {editId ? (
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
          onClick={updatedfun}
        >
          Update
        </button>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          onClick={savefun}
        >
          Add
        </button>
      )}
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="border px-4 py-2">Sr.No</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(store) &&
            store.map((val) => (
              <tr
                key={val.id}
                className="text-center hover:bg-gray-50 transition"
              >
                <td className="border px-4 py-2">{val.id}</td>
                <td className="border px-4 py-2">{val.name}</td>
                <td className="border px-4 py-2">{val.email}</td>

                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => deletfun(val.id)}
                  >
                    Delete
                  </button>

                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    onClick={() => editedfun(val)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
}

export default App;
