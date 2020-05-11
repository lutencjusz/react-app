import React from 'react';
import { Form, Field } from 'react-final-form'

function AddTransactionForm () {

    const required = value => (value ? undefined : 'Pole wymagane!') // jeżeli nie ma błedu to zwraca undefined

    return (
        <Form
            onSubmit={console.log}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
                <Field name="description" validate={required}>
                {({ input, meta }) => (
                    <div>
                    <label>Opis</label>
                    <input {...input} type="text" placeholder="Opis" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                )}
                </Field>
                <Field name="amount" 
                    validate={required} 
                    parse={value => parseFloat(value,10)}
                >
                {({ input, meta }) => (
                    <div>
                    <label>Wartość transakcji</label>
                    <input {...input} 
                        type="number" 
                        step="0.1" 
                        placeholder="Wartość transakcji"
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                )}
                </Field>
                <Field 
                    name="category" 
                    validate={required}
                    format={value => (value ? value.toLowerCase() : '')}
                >
                {({ input, meta }) => (
                    <div>
                    <label>Kategoria</label>
                    <input {...input} 
                        type="text" 
                        placeholder="Kategoria" 
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                )}
                </Field>
                <Field name="date" validate={required}>
                {({ input, meta }) => (
                    <div>
                    <label>Data</label>
                    <input {...input} type="date" placeholder="Data wykonania transakcji" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                )}
                </Field>

                <div className="buttons">
                <button type="submit" disabled={submitting}>
                    Submit
                </button>
                <button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                >
                    Reset
                </button>
                </div>
            </form>
            )}
      />
    )
}

export default AddTransactionForm;