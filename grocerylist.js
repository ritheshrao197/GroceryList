$(function () {
	let jsonData = { items: [] }; // Initialize with an empty object

    // Fetch the JSON data dynamically
    function loadJSON() {
        $.getJSON('items.json', function (data) {
            jsonData = data;
            populateDropdown();
        }).fail(function () {
            alert('Failed to load item data.');
        });
    }

    // Populate the dropdown
    function populateDropdown() {
        const dropdown = $('#itemDropdown');
        dropdown.empty();
        jsonData.items.forEach(item => {
            $('<option>').text(item).val(item).appendTo(dropdown);
        });
    }

    // Call loadJSON to initialize the dropdown
    loadJSON();

    // // Function to populate the dropdown
    // function populateDropdown() {
    //     const dropdown = $('#itemDropdown');
    //     dropdown.empty(); // Clear existing options
    //     jsonData.items.forEach(item => {
    //         $('<option>').text(item).val(item).appendTo(dropdown);
    //     });
    // }

    // Initialize the dropdown
    populateDropdown();

    // Function to add an item to the appropriate list
    function addItemToList(listId) {
        const selectedItem = $('#itemDropdown').val();
        const quantity = $('#quantity').val();

        // Validate inputs
        if (!selectedItem || !quantity || quantity <= 0) {
            alert("Please select an item and enter a valid quantity.");
            return;
        }

        // Create the new list item
        const listItem = $(`
            <li>
                <input type="checkbox" name="item"> 
                ${selectedItem} (Qty: ${quantity}) 
                <a href="#" class="removeItem">remove</a>
            </li>
        `);

        // Add the item to the specified list
        $(`#${listId}`).append(listItem);

        // Clear the quantity input for convenience
        $('#quantity').val('');
    }

    // Handle adding to "Need"
    $('#addNeed').click(function () {
        addItemToList('needList');
    });

    // Handle adding to "Have"
    $('#addHave').click(function () {
        addItemToList('haveList');
    });

    // Allow adding new items to the dropdown
    $('#addNewItem').click(function () {
        const newItem = prompt("Enter new item name:");
        if (newItem && !jsonData.items.includes(newItem)) {
            jsonData.items.push(newItem);
            populateDropdown();
            alert(`${newItem} has been added to the dropdown.`);
        } else if (jsonData.items.includes(newItem)) {
            alert("This item already exists in the dropdown.");
        }
    });

    // Handle moving items between lists based on checkbox
    $('body').on('click', 'input[type=checkbox]', function () {
        const listItem = $(this).closest('li');
        const targetListId = this.checked ? 'haveList' : 'needList';
        $(`#${targetListId}`).append(listItem);
    });

    // Handle removing items from a list
    $('body').on('click', '.removeItem', function (e) {
        e.preventDefault();
        $(this).closest('li').remove();
    });
});
