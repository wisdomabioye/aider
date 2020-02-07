import { useState, useEffect } from "react";

import Main from "../../layouts/Main";
import { Input, Button, Select } from "../../components/FormElements";
import Loading from "../../components/LoadingIcon";
import FinanceChart from "../../components/LineChart";
import { MonthPicker } from "../../components/DatePicker";
import { JSONFile } from "../../helpers/blockstack";
import { financeFilename, daysInMonth, numberToArray, sumAmount } from "../../helpers/main";
import { sampleFinanceData } from "../../app.config";

const FINANCE = new JSONFile("finances/");

export default function Finance() {
	let [formConfig, setFormConfig] = useState({});
	let [targetMonth, setTargetMonth] = useState(financeFilename());
	let [data, setData] = useState(null);
	let [usingSampleData, setUseSampleDate] = useState(false);
	let [originalData, setOriginalData] = useState(null);

	useEffect( () => {
		fetchData();	
	}, [targetMonth])

	async function fetchData() {
		try {
			let finances = await FINANCE.getJSON(addJSONExt(targetMonth));
			setData(finances);
			setOriginalData(finances);
		} catch (error) {
			console.log(error);
		}
	}

	async function updateData(doc) {
		try {
			await setOrMergeThisMonthFinanceData(doc);
			fetchData();
		} catch (error) {
			console.log(error);
		}
	}


	function handleButton(e) {
		let formType = e.target.getAttribute("data-type");
		let newConfig = {type: formType, formHandler: updateData};

		if (formType == "Earn") {
			newConfig["placeholder"] = "from salary";
			setFormConfig(newConfig);
		
		} else if (formType == "Spend") {
			newConfig["placeholder"] = "on shopping";
			setFormConfig(newConfig);
		}
	}

	function toggleSampleData() {
		if (usingSampleData) {
			let newData = JSON.parse(JSON.stringify(originalData));
			setData(newData);
			setUseSampleDate(false);
		} else {
			let newData = JSON.parse(JSON.stringify(sampleFinanceData));
			let previousData = JSON.parse(JSON.stringify(data || ""));
			setData(newData);
			setOriginalData(previousData);
			setUseSampleDate(true);
		}
	}

	function changeDate(e) {
		let newDate = financeFilename(e.target.value);
		setTargetMonth(newDate);
	}

	return (
		<Main title="Financial Record">
			<div className="columns is-mobile">
				<div className="column is-9">
					<MonthPicker changeHandler={changeDate} />
				</div>
				<div className="column is-3">
					<button className="button is-dark is-small" onClick={toggleSampleData}>{usingSampleData ? "Remove sample data" : "Use sample data"}</button>
				</div>
			</div>
			<div className="mt-1">
				<FinanceChart data={data} />
			</div>
			<div>
				<div className="buttons are-small">
					
					<button className="button is-dark" data-type="Earn" onClick={handleButton}> Add Earning </button>
					
					<button className="button is-dark" data-type="Spend" onClick={handleButton}> Add Spending </button>
				</div>
				<AddFinanceForm {...formConfig} />	
				
			</div>
			<FinancesList data={data} monthstr={targetMonth} />
		</Main>
	)
} 

function AddFinanceForm(props) {
	let [isSubmitting, setIsSubmitting] = useState(false);
	let [formData, setFormData] = useState({});
	let [formError, setFormError] = useState("");

	async function submitHandler(e) {
		e.preventDefault();

		if (!formData["amount"] || !Number(formData["amount"])) {
			setFormError(`You're ${props.type.toLowerCase()}ing an invalid amount`);
		
		} else if (!formData["comment"]) {
			setFormError(`Add some ${props.type.toLowerCase()}ing comment`);
		
		} else {
			setFormError("");
			setIsSubmitting(true);
			//submit form
			await props.formHandler(formData);
			setFormData({});
			setIsSubmitting(false);
		}
	}

	function handleChange(e) {
		let {name, value} = e.target;
		let newFormData = {...formData, [name]: value, type: props.type};
		setFormData(newFormData);
	}

	if (!props["type"]) {
		return null;
	}

	return (
		<form className="columns is-mobile is-multiline" onSubmit={submitHandler}>
			<div className="column is-12 pt-0 pb-0">
				<p className="is-size-7"> Add new {props.type}ing </p>
			</div>
			<div className="column is-3">
				<Input 
					className="is-small"
					placeholder="150"
					name="amount"
					autoComplete="off"
					onChange={handleChange}
					value={formData["amount"] || ""}
				/>
			</div>
			<div className="column is-6">
				<Input 
					className="is-small"
					placeholder={props.placeholder}
					name="comment"
					autoComplete="off"
					onChange={handleChange}
					value={formData["comment"] || ""}
				/>
			</div>
			<div className="column is-3">
				<Button 
					className={`button is-small is-dark ${isSubmitting && "is-loading"}`}
					text="Submit"
					type="submit"
				/>
			</div>
			<div className="column is-12 pt-0 pb-0">
				<p className="is-size-7 has-text-danger"> {formError} </p>
			</div>
		</form>
	)
}


function FinancesList(props) {
	let [day, setDay] = useState(new Date().getDate());
	let my = props.monthstr; // 12020 | 112019

	let year, month;
	if (my) {
		year = Number(my.substring(my.length, my.length-4)); // 2020 | 2019
		month = Number(my.substring(0, my.length-4)); // 1 | 2 | 12 || 10
	} else {
		let newDate = new Date();
		year = newDate.getFullYear(); // 2020 | 2019
		month = newDate.getMonth() + 1; // 1 | 2 | 12 || 10
	}

	var selectOptions = numberToArray(daysInMonth(month, year)).map(i => ({value: i+1}));

	let dayFinances;
	if (props.data) {
		dayFinances = props.data.find( finance => finance.day == day );
	}

	function handleChange(e) {
		let {value} = e.target;
		setDay(value);
	}

	return (
		<div className="columns is-centered is-multiline mt-4 mb-4">
			<div className="column is-12 pb-0 is-size-7">
				<label>Select a day &nbsp;</label><br/>
				<Select 
					options={selectOptions}
					value={day}
					onChange={handleChange}
					className="is-small"
				/>
			</div>
			<div className="column mt-2 mb-2">
				<DailyTotal 
					data={dayFinances ? dayFinances["earnings"] : []} 
					text="Earning"
				/>
				<FinanceTable 
					data={dayFinances ? dayFinances["earnings"] : []}
					text="earning"
				/>
			</div>
			<div className="column mt-2 mb-2">
				<DailyTotal 
					data={dayFinances ? dayFinances["spendings"] : []} 
					text="Spending"
				/>
				<FinanceTable 
					data={dayFinances ? dayFinances["spendings"] : []}
					text="spending"
				/>
			</div>
		</div>
	)
}


function DailyTotal(props) {
	return (
		<p className="is-size-7 mb-2 pb-2">
			Total { props.text }:  
			${ sumAmount(props.data) }
		</p>
	)
}


function FinanceTable(props) {
	return (
		<table className="table is-bordered is-size-7">
			<thead>
				<tr>
					<th> Sn </th>
					<th> Amount ($) </th>
					<th> Comment </th>
				</tr>
			</thead>
			<tbody>
				{
					props.data
					&&
					props.data.length
					?
					props.data.map( (item, i) => (
						<tr key={ i }>
							<td> { i + 1 } </td>
							<td> { item.amount } </td>
							<td> { item.comment } </td>
						</tr>
					))
					:
					<tr>
						<td colSpan="3">No {props.text} record</td>
					</tr>
				}
			</tbody>
		</table>
	)
}


async function setOrMergeThisMonthFinanceData(data) {
	//build the filename
	let date = new Date();
    let today = date.getDate();
    let thisMonth = financeFilename(date) // filename
    let targetType;

    //grab finance type
    if (data["type"] == "Spend") {
        targetType = "spendings";
    } else if (data["type"] == "Earn") {
        targetType = "earnings";
    }
    //build the new finance
    const newFinance = {amount: data["amount"], comment: data["comment"]};

    //each day finance schema
    const dailyFinanceSchema = {
        day: today,
        earnings: [],
        spendings: []
    }

    return await FINANCE.getJSON(addJSONExt(thisMonth))
    .then( oldData => {
        if (!oldData) {
            // build the new month finance file
            dailyFinanceSchema[targetType].push(newFinance);
            return FINANCE.setJSON(addJSONExt(thisMonth), [dailyFinanceSchema]);
        } else {
            // there is oldData
            // lets update it
            
            let index /*index of todayDoc*/;
            
            let todayDoc = oldData.find((doc, i) => {
                    if (doc.day == today) {
                        index = i;
                        return true;
                    }
                });

            if (todayDoc) {
                // modify today doc and update
                todayDoc[targetType].push(newFinance);
                oldData[index] = todayDoc;
                
                return FINANCE.setJSON(addJSONExt(thisMonth), oldData);
            } else {
                //no today doc
                //build today doc
                dailyFinanceSchema[targetType].push(newFinance);
                oldData.push(dailyFinanceSchema);
                return FINANCE.setJSON(addJSONExt(thisMonth), oldData);
            }
        }
    })
    .catch(error => {
        console.log("error", error);
    })
}


function addJSONExt(name) {
	return name + ".json";
}