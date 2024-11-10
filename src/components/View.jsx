import React from 'react'
import Add from './Add'
import Edit from './Edit'

const View = () => {
    return (
        <>
            <div className="d-flex justify-content-between">
                <h2 className='text-warning'>All Recipes & Details</h2>
                <div> <Add /> </div>
            </div>
            <div className='mt-2 allProjects'>
                <div className='border rounded p-2 d-flex justify-content-between mb-3'>
                    <h3>title</h3>
                    <div className='d-flex align-items-center '>
                        <div className='btn'> <Edit /> </div>
                        <button className='btn text-danger'><i className='fa-solid fa-trash'></i></button>
                    </div>
                </div>
                {/* <div className='text-warning fw-bolder'>Not uploaded any projects yet!!</div> */}
            </div>
        </>
    )
}

export default View