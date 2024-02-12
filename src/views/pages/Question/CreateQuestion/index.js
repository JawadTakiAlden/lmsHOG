import { useState, useRef, useEffect } from 'react'
const CreateQuestion = () => {
  const [value, setValue] = useState('\\sqrt{x}')
  const mf = useRef()
  useEffect(() => {
    mf.current.smartFence = true
    mf.current.addEventListener('input', (evt) => {
      if (evt.inputType === 'insertLineBreak') {
        evt.target.executeCommand('plonk')
      }
    })
  }, [])
  useEffect(() => {
    mf.current.value = value
  }, [value])

  return (
    <div className='App'>
      <math-field ref={mf} onInput={(evt) => setValue(evt.target.value)}>
        {value}
      </math-field>
    </div>
  );
}

export default CreateQuestion