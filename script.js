function max_length_string(mass) {
	var 
		i = 0, 
		string, 
		max_length_string_index, 
		temp_length,
		temp_value, 
		max_length = 0;

	if (mass.length == 0) {
		return "";
	}

	mass.forEach(e => {
		temp_value = to_string(e);
		temp_length = temp_value.length;
		if (temp_length > max_length) {
			max_length_string_index = i;
			max_length = temp_length;
		}
		i++;
	});
	
	return to_string(mass[max_length_string_index]);
}

function to_string(value) {
	if (typeof(value) != "string") {
		return String(value);	
	}
	
	return value;
}

function frequently_used_symbol(string) {
	var 
		buffer = to_string(string),
		temp_value,
		current_simbol,
		counter = 0,
		mass_values = new Map();

	if (buffer == to_string("string")) {
		return "";
	}

	for (var i = 0; i < buffer.length; i++) {
		current_simbol = buffer[i];
		if (mass_values.has(current_simbol)) {
			temp_value = mass_values.get(current_simbol);
			mass_values.set(current_simbol, temp_value + 1);
		} else {
			mass_values.set(current_simbol, 1);
		}
	}

	current_simbol = "";
	mass_values.forEach((value, key) => {
		if (value > counter) {
			counter = value;
			current_simbol = key;
		}
	});

	return current_simbol;
}

function replace_simbol(string, simbol) {
	var 
		buffer = to_string(string), 
		other_simbol,
		new_string = "";

	other_simbol = to_string(prompt("Введи символ"));

	for (var i = 0; i < buffer.length; i++) {
		if (buffer[i] == simbol) {
			new_string += other_simbol;
		} else {
			new_string += buffer[i];
		}
	}

	return new_string;
}

function anagramm(strings) {
	var 
		counter = -1,
		current_mass_simbols,
		current_simbol,
		temp_value,
		buffer = new Array(),
		mass_simbols = new Array();
	
	if (!Array.isArray(strings)) {
		return false;
	}

	strings.forEach(e => {buffer.push(e);});

	buffer.forEach(string => {
		mass_simbols.push(new Map());
		counter++;
		string = string.toLowerCase();

		for (var i = 0; i < string.length; i++) {
			current_simbol = string[i];

			if (mass_simbols[counter].has(current_simbol)) {
				temp_value = mass_simbols[counter].get(current_simbol);
				mass_simbols[counter].set(current_simbol, temp_value + 1);
			} else {
				mass_simbols[counter].set(current_simbol, 1);
			}
		}
	});

	current_mass_simbols = mass_simbols[0];

	for (var i = 1; i < mass_simbols.length; i++) {
		if (current_mass_simbols.length != mass_simbols[i].length) {
			return false;
		}

		temp_value = false;
		current_mass_simbols.forEach((value, key) => {
			if (!mass_simbols[i].has(key)) {
				temp_value = true;
			} else {
				if (mass_simbols[i].get(key) != value) {
					temp_value = true;
				}
			}
		});

		if (temp_value) {
			return false;
		}
	}

	return true;
}

var container = document.getElementById("container");

function update() {
	if (document.getElementById("output_string").textContent != "") {
		get_max_length_string();
	}

	if (document.querySelectorAll("li[id='simbol_item']").length != 0) {
		get_frequently_used_symbol();
	}

	if (document.getElementById("output_anagramm_checker").textContent != "") {
		check_anagramm();
	}
}

function add() {
	var 
		buffer,		
		string = document.getElementById("main_input");

	buffer = to_string(string.value);
	string.value = "";
	
	add_string(buffer);

	update();
}

function add_string(string) {
	var element = document.createElement("li");

	if (string == "") {
		return;
	}

	element.setAttribute("id", "string_item");
	element.textContent = string;
	container.appendChild(element);
}

function remove_string() {
	var 
		index = document.getElementById("delete_input").value - 1,
		element = document.querySelectorAll("li[id='string_item']")[index];

	if (element === undefined) {
		return;
	}
	
	container.removeChild(element);

	update();
}

function remove_all() {
	var 
		popular_simbol_container = document.getElementById("popular_simbol_container"),
		element = document.querySelectorAll("li[id='string_item']");

	element.forEach(e => container.removeChild(e));

	document.getElementById("output_string").textContent = "";

	document.querySelectorAll("li[id='simbol_item']").forEach(e => popular_simbol_container.removeChild(e));

	document.getElementById("output_anagramm_checker").textContent = "";
}

function get_max_length_string() {
	var 
		elements = document.querySelectorAll("li[id='string_item']"),
		all_strings = new Array(),
		li = document.getElementById("output_string"),
		div = document.getElementById("output_string_field");

	elements.forEach(e => all_strings.push(e.textContent));

	li.textContent = max_length_string(all_strings);
}

function get_frequently_used_symbol() {
	var 
		popular_simbol_container = document.getElementById("popular_simbol_container"),
		old_elements = document.querySelectorAll("li[id='simbol_item']"),
		elements = document.querySelectorAll("li[id='string_item']"),
		li = document.getElementById("output_string"),
		div = document.getElementById("output_string_field");

	old_elements.forEach(e => popular_simbol_container.removeChild(e));

	elements.forEach(e => {
		var new_element = document.createElement("li");
		new_element.setAttribute("id", "simbol_item");
		new_element.textContent = frequently_used_symbol(e.textContent);
		popular_simbol_container.appendChild(new_element);
	});
}

function do_replace_simbol() {
	var index = document.getElementById("edit_input").value - 1;
	var element = document.querySelectorAll("li[id='string_item']")[index];

	element.textContent = replace_simbol(element.textContent, frequently_used_symbol(element.textContent));

	update();
}

function check_anagramm() {
	var 
		output_anagramm_checker = document.getElementById("output_anagramm_checker"),
		all_strings = new Array(),
		elements = document.querySelectorAll("li[id='string_item']");

	elements.forEach(e => all_strings.push(to_string(e.textContent)));

	output_anagramm_checker.textContent = anagramm(all_strings);
}