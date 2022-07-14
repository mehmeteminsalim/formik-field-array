import React from 'react';
import {ErrorMessage, FieldArray, FormikProvider, useFormik} from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
    educationInfos: yup.array(yup.object({
        university: yup
            .string("Enter your university")
            .required("University is required"),
        degree: yup
            .string("Enter your degree")
            .required("Degree is required"),
        department: yup
            .string("Enter your department")
            .required("Department is required"),
        startYear: yup
            .string("Enter your start year")
            .required("Start year is required"),
        endYear: yup
            .string("Enter your end year")
            .required("End year is required")
    }))
});

function EducationInfo() {
    const formik = useFormik({
        initialValues: {
            educationInfos : [
                { university: "", degree: "", department: "", startYear: "",endYear: "" }
            ]
        },
        validationSchema: validationSchema,
        validateOnBlur: true,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        }
    });

    function educationInfoErrorMessageGenerator(name,index) {
        if ( Array.isArray(formik?.errors?.educationInfos) && formik?.errors?.educationInfos?.length > 0 && formik?.errors?.educationInfos[index]?.[name] ) {
            return <span style={{color : "red"}}>{formik?.errors?.educationInfos[index]?.[name]}</span>
        }
    }

    return (
        <>
            <FormikProvider value={formik}>
                <FieldArray
                    name="educationInfos"
                    render={(arrayHelpers) => (
                        <div>
                            {formik.values.educationInfos.map((_educationInfo, index) => (
                                <div key={index}>
                                    <div style={{display : "flex", columnGap : "10px"}}>
                                        <div style={{display : "flex", flexDirection : "column"}}>
                                            <input
                                                placeholder="University"
                                                name={`educationInfos[${index}].university`}
                                                value={formik.values.educationInfos[index].university}
                                                onChange={formik.handleChange}
                                            />
                                            {educationInfoErrorMessageGenerator("university",index)}
                                        </div>
                                        <div style={{display : "flex", flexDirection : "column"}}>
                                            <input
                                                placeholder="Degree"
                                                name={`educationInfos[${index}].degree`}
                                                value={formik.values.educationInfos[index].degree}
                                                onChange={formik.handleChange}
                                            />
                                            {educationInfoErrorMessageGenerator("degree",index)}
                                        </div>
                                        <div style={{display : "flex", flexDirection : "column"}}>
                                            <input
                                                placeholder="Department"
                                                name={`educationInfos[${index}].department`}
                                                value={formik.values.educationInfos[index].department}
                                                onChange={formik.handleChange}
                                            />
                                            {educationInfoErrorMessageGenerator("department",index)}
                                        </div>
                                        <div style={{display : "flex", flexDirection : "column"}}>
                                            <input
                                                placeholder="Start Year"
                                                name={`educationInfos[${index}].startYear`}
                                                value={formik.values.educationInfos[index].startYear}
                                                onChange={formik.handleChange}
                                            />
                                            {educationInfoErrorMessageGenerator("startYear",index)}
                                        </div>
                                        <div style={{display : "flex", flexDirection : "column"}}>
                                            <input
                                                placeholder="End Year"
                                                name={`educationInfos[${index}].endYear`}
                                                value={formik.values.educationInfos[index].endYear}
                                                onChange={formik.handleChange}
                                            />
                                            {educationInfoErrorMessageGenerator("endYear",index)}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => arrayHelpers.remove(index)}
                                        >Delete</button>
                                    </div>
                                </div>

                            ))}
                            <button
                                type="button"
                                onClick={() => arrayHelpers.push({ university: "", degree: "", department: "", startYear: "",endYear: "" })}
                            >Add Education</button>
                        </div>
                    )}
                />
            </FormikProvider>
            <hr/>
            <pre>Errors => {JSON.stringify(formik.errors,null,2)}</pre>
            <hr/>
            <pre>Values => {JSON.stringify(formik.values,null,2)}</pre>
        </>
    );
}

export default EducationInfo;