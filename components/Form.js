import React, { useState } from 'react'
import useSwr from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json());


function OptInForm() {
  
  const [emailAddress, setEmailAddress, name, setName, message, setMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault
    // let { status } = await addToMailchimp(client, { emailAddress })
    const { data, error } = useSwr('../pages/api/send-email', fetcher)
    if (data.status === 200) setIsSubmitted(true)
  }

  if (isSubmitted) {
    return <p>Thanks for giving us your details!</p>
  }

  return (
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="email"
    //     onChange={e => setEmailAddress(e.target.value)}
    //     value={emailAddress}
    //     required
    //   />
    //   <button type="submit">Sign up</button>
    // </form>
    <form onSubmit={handleSubmit}>
    <div style={{marginBottom:"20px"}}>
      <label for="name" style={{marginRight:"80px"}}>Name</label>
      <input onChange={e => setName(e.target.value)} value={name} type="text" id="name" placeholder="Your name" required />
    </div>
    <div style={{marginBottom:"20px"}}>
      <label for="email" style={{marginRight:"80px"}}>Email</label>
      <input onChange={e => setEmailAddress(e.target.value)} value={emailAddress} type="email" id="email" placeholder="Your email" required />
    </div>
    
    <div style={{marginBottom:"20px", verticalAlign:"center"}}>
      <label for="message" style={{marginRight:"80px"}}>Message</label>
      <textarea onChange={e => setMessage(e.target.value)} 
      value={message} id="message" cols="20" rows="5" placeholder="Leave a message" />
    </div>
   
    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
  
  )
}

export default OptInForm
