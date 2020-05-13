import React, {useMemo} from 'react';
import { Form, Field } from 'react-final-form';
import {groupBy, noop} from 'lodash'; //noop zastępuje () =>{}

function AddTransactionForm ({categories, groupCategoriesBy, onSubmit = noop}) {

    const required = value => (value ? undefined : 'Pole wymagane!') // jeżeli nie ma błedu to zwraca undefined

    const groupCategoriesByParentName = groupCategoriesBy ? groupBy(categories, groupCategoriesBy) : null // jest obiektem

    const categoryItems = useMemo(() =>groupCategoriesByParentName ? Object.entries(groupCategoriesByParentName)
        .map(([parentName, categories]) => (
            <optgroup label={parentName} key={parentName}>
                {categories.map(category=>(
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </optgroup>            
        ))
        : categories.map(category => (
            <option value={category.id}>{category.name}</option>
        ))
        
        ,[groupCategoriesByParentName, categories])

    return (
        <Form
            onSubmit={onSubmit}
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
                    name="categoryId" 
                    validate={required}
                    format={value => (value ? value.toLowerCase() : '')}
                >
                {({ input, meta }) => (
                    <div>
                    <label>Kategoria</label>
                    <select {...input}>
                        {categoryItems}
                    </select>
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