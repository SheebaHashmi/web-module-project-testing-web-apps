import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';
import { expressionStatement } from '@babel/types';

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);

    const header = screen.getByText(/contact form/i);

    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent("Contact Form")
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);

        const firstNameField = screen.getByLabelText(/first name*/i);
        
        userEvent.type(firstNameField,"blah");

        const errors = await screen.findAllByTestId('error');
        expect(errors).toHaveLength(1) 



});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);

    const submitBtn = screen.getByRole("button");
    
    userEvent.click(submitBtn)

    const errors = await screen.findAllByTestId('error');
    expect(errors).toHaveLength(3)
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);

    const firstNameField = screen.getByLabelText(/first name*/i);    
    const lastNameField = screen.getByLabelText(/last name*/i);      
    const submitBtn = screen.getByRole("button");

    userEvent.type(firstNameField,'sheeba');
    userEvent.type(lastNameField,'hashmi');
    userEvent.click(submitBtn);

    const errors = await screen.findAllByTestId('error');
    expect(errors).toHaveLength(1)

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)

    const emailField = screen.getByLabelText(/email*/i);

    userEvent.type(emailField,'blahblahblah');

    const errors = await screen.findAllByTestId('error');
    expect(errors).toHaveTextContent("email must be a valid email address")
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
});