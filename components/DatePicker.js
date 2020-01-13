
let date = new Date();

export function MonthPicker(props) {
	let thisYear = date.getFullYear().toString();

	let month = date.getMonth() + 1;
	let thisMonth =  month > 9 ? month.toString() : "0" + month.toString();
	
	/*let day = date.getDate();
	let thisDay =  day > 9 ? day.toString() : "0" + day.toString();*/

	return (
		<div className="is-size-7">
			<label htmlFor="month"> Select Month </label>&nbsp;
			<input 
				type="month" 
				defaultValue={thisYear + "-" + thisMonth}
				id="month"
				onChange={props.changeHandler} 
				pattern="[0-9]{4}-[0-9]{2}"
			/>
			<style jsx>
				{`
					input {
					  border: 1px solid #c4c4c4;
					  border-radius: 5px;
					  background-color: #fff;
					  padding: 3px 5px;
					  box-shadow: inset 0 3px 6px rgba(0,0,0,0.1);
					}	
				`}
			</style>
		</div>
	)
}