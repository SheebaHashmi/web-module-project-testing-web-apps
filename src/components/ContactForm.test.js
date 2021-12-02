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

    const errors = await screen.findByText(/email must be a valid email address/i);
    
    expect(errors).toBeInTheDocument();
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);

    const firstNameField = screen.getByLabelText(/first name*/i);
    const emailField = screen.getByLabelText(/email*/i);
    const submitBtn = screen.getByRole('button');

    userEvent.type(firstNameField,'Mikee');
    userEvent.type(emailField,'mikesullivan@monster.inc');
    userEvent.click(submitBtn);

    const error = await screen.findByText(/lastName is a required field/i);
    expect(error).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);

    const firstNameField = screen.getByLabelText(/first name*/i);
    const lastNameField = screen.getByLabelText(/last name*/i);
    const emailField = screen.getByLabelText(/email*/i);
    const messageField = screen.getByLabelText(/message/i);
    const submitBtn = screen.getByRole('button');

    userEvent.type(firstNameField,'Mikee');
    userEvent.type(lastNameField,'Sullivan');
    userEvent.type(emailField,'mikesullivan@monster.inc');
    userEvent.click(submitBtn);

    const message = await screen.findByLabelText(/message/i)

    expect(message).toHaveTextContent("");
    expect(firstNameField).toBeInTheDocument();
    expect(lastNameField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);

    const firstNameField = screen.getByLabelText(/first name*/i);
    const lastNameField = screen.getByLabelText(/last name*/i);
    const emailField = screen.getByLabelText(/email*/i);
    const messageField = screen.getByLabelText(/message/i);
    const submitBtn = screen.getByRole('button');

    userEvent.type(firstNameField,'Mikee');
    userEvent.type(lastNameField,'Sullivan');
    userEvent.type(emailField,'mike@monster.inc');
    userEvent.type(messageField,'Hello I am Mike!');
    userEvent.click(submitBtn);

    const firstName = await screen.findByDisplayValue(/mikee/i);
    const lastName = await screen.findByDisplayValue(/sullivan/i);
    const email = await screen.findByDisplayValue(/mike@monster.inc/i);
    const message = await screen.findByDisplayValue('Hello I am Mike!');

    expect(firstName).toBeInTheDocument()
    expect(lastName).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(message).toBeInTheDocument()
});