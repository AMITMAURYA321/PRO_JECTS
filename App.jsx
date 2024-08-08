import { useState,useCallback,useEffect,useRef} from 'react'

function App() {
const [length,setlength]=useState(8)
const [numberallow,setnumberallow]=useState(false)
const [charallow,setcharallow]=useState(false)
const[password,setpassword]=useState("")

// useREf hook

const passwordRef = useRef(null)

const passwordGenerator = useCallback(()=>{

let pass=""
let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
if(numberallow) str += "0123456789"
if(charallow) str +="!@#$%^&*{}|~()"

for (let i = 1; i <= length; i++){
  
  let char = Math.floor(Math.random()*str.length+1)
  pass+=str.charAt(char)
}

setpassword(pass)

},[length,numberallow,charallow,setpassword])

const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,8)

window.navigator.clipboard.writeText(password)
}, [password])

useEffect(()=>{
  passwordGenerator()
},[length,numberallow,charallow,passwordGenerator])

  return (
   <>

      <div className="w-full max-w-md mx-auto shadow-md
       rounded-lg px-4 py-3 my-10 text-orange-500 bg-gray-800">

        <h1 className='text-white text-center my-3'>PASSWORD-GENERATOR</h1>
       
       
       <div className="flex shadow rounded-lg overflow-hidden
        mb-4"><input type="text"
        value={password}
        className="outline-none w-full py-1 px-3"
        placeholder="Password"
        readOnly
        ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-non bg-lime-300 text-white
         px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={0}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setlength(e.target.value)}}
          /> 
          <label> length:{length}</label>

        </div>
        <div className='flex items-center gap-x-1'>
          <input
           type="checkbox"
           defaultChecked={charallow}
           id='charInput'
           onChange={()=>{
            setnumberallow((prev)=>!prev)
           }}
           />
           <label htmlFor="NumberInput">Charaters</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
           type="checkbox"
           defaultChecked={numberallow}
           id='numberInput'
           onChange={()=>{
            setnumberallow((prev)=>!prev)
           }}
           />
           <label htmlFor="NumberInput">Number</label>
        </div>
       </div>
    </div>
   </> 

  )
}

export default App
