import React, { useState } from 'react'

const ContactForm = () => {
  // State hooks for form inputs
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [emailBody, setEmailBody] = useState('')

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here (e.g., send data to a server or API)
    console.log({
      firstName,
      lastName,
      email,
      emailBody,
    })

    // Optionally reset form fields after submission
    setFirstName('')
    setLastName('')
    setEmail('')
    setEmailBody('')
  }

  return (
    <form onSubmit={handleSubmit} className='w-1/3  p-4 border rounded-md shadow-md'>
      <div className='mb-4'>
        <label htmlFor='firstName' className='block text-sm font-medium text-white'>
          First Name
        </label>
        <input
          type='text'
          id='firstName'
          name='firstName'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className='mt-1 block w-full p-2 border rounded-md'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='lastName' className='block text-sm font-medium 0'>
          Last Name
        </label>
        <input
          type='text'
          id='lastName'
          name='lastName'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className='mt-1 block w-full p-2 border rounded-md'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='email' className='block text-sm font-medium 0'>
          Email
        </label>
        <input
          type='email'
          id='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='mt-1 block w-full p-2 border rounded-md'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='emailBody' className='block text-sm font-medium 0'>
          Email Body
        </label>
        <textarea
          id='emailBody'
          name='emailBody'
          value={emailBody}
          onChange={(e) => setEmailBody(e.target.value)}
          required
          className='mt-1 block w-full p-2 border rounded-md'
          rows='6'
        />
      </div>

      <button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded-md'>
        Submit
      </button>
    </form>
  )
}

export default ContactForm
