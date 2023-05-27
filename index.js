// const discountGroups = [
// 	{ id: 1, quantityMin: 3, quantityMax: 5, discountPrice: 0.5 },
// 	{ id: 2, quantityMin: 1, quantityMax: 1, discountPrice: 0.75 },
// 	{
// 		id: "1674508763771x658553238447456300",
// 		quantityMin: 4,
// 		quantityMax: 7,
// 		discountPrice: 4,
// 	},
// ];

// const cart = [
// 	{ name: "shampoo", quantity: 20, discountGroup: 1, price: 1.0 },
// 	{ name: "Sponge", quantity: 5, discountGroup: 1, price: 1.0 },
// 	{ name: "Soap", quantity: 2, discountGroup: null, price: 2.0 },
// 	{ name: "Bath", quantity: 3, discountGroup: 2, price: 3.0 },
// 	{
// 		name: "1674641517189x111974505468657660",
// 		quantity: 1,
// 		discountGroup: "1674508763771x658553238447456300",
// 		price: 5,
// 	},
// 	{
// 		name: "1674644851778x295218480352329700",
// 		quantity: 4,
// 		discountGroup: "1674508763771x658553238447456300",
// 		price: 5,
// 	},
// ];

const discountGroups = [
	{
		id: "1674508763771x658553238447456300",
		quantityMin: 4,
		quantityMax: 7,
		discountPrice: 4,
	},
	{
		id: "1674663626996x199296414591483900",
		quantityMin: 4,
		quantityMax: 4,
		discountPrice: 3,
	},
];

const cart = [
	{
		name: "item 1",
		quantity: 8,
		discountGroup: "1674508763771x658553238447456300",
		price: 5,
	},
	{
		name: "item 2",
		quantity: 3,
		discountGroup: "1674663626996x199296414591483900",
		price: 5,
	},
	{
		name: "item 3",
		quantity: 2,
		discountGroup: "1674663626996x199296414591483900",
		price: 5,
	},
	// {
	// 	name: "item 4",
	// 	quantity: 3,
	// 	discountGroup: "1674663626996x199296414591483900",
	// 	price: 5,
	// },
];

// function calculation(discountGroupsOriginal, cart) {
// 	var discountGroups = discountGroupsOriginal.slice();
// 	var finalArray = [];

// 	discountGroups.forEach(async (group) => {
// 		var initialGroupMax = group.quantityMax;
// 		var tempArray = [];
// 		var totalQuantity = 0;
// 		var prevTotal = 0;

// 		cart.forEach((item, index) => {
// 			if (item.discountGroup + "" === group.id + "") {
// 				tempArray.push(item);
// 				totalQuantity += item.quantity;
// 			}
// 		});

// 		tempArray.forEach((item) => {
// 			var tempItem = {
// 				name: item.name,
// 				quantity: 0,
// 				discountGroup: item.discountGroup,
// 				price: item.price,
// 			};

// 			// If total quantity is zero.
// 			if (totalQuantity <= 0) {
// 				return;
// 			}

// 			console.log("------------------------");
// 			console.log(
// 				"--> 0   T=" +
// 					totalQuantity +
// 					" I=" +
// 					item.quantity +
// 					" G=" +
// 					group.quantityMax +
// 					" P=" +
// 					prevTotal
// 			);

// 			// If item quantity in the range of discount.
// 			if (
// 				(totalQuantity >= group.quantityMin &&
// 					item.quantity <= group.quantityMin) ||
// 				(totalQuantity >= group.quantityMin &&
// 					item.quantity >= group.quantityMin &&
// 					item.quantity <= group.quantityMax)
// 			) {
// 				var tempGroupMax =
// 					group.quantityMax - item.quantity < 0
// 						? 0
// 						: group.quantityMax - item.quantity;

// 				tempItem.quantity = item.quantity;
// 				tempItem.priceWithDiscount = group.discountPrice;
// 				tempItem.discountApplied = true;
// 				tempItem.subTotal = item.quantity * group.discountPrice;

// 				// Adding item to discounted array.
// 				finalArray.push(tempItem);
// 				prevTotal = totalQuantity;
// 				totalQuantity = totalQuantity - item.quantity;
// 				group.quantityMax = tempGroupMax;
// 				console.log(
// 					"--> 1   T=" +
// 						totalQuantity +
// 						" I=" +
// 						item.quantity +
// 						" G=" +
// 						group.quantityMax
// 				);
// 			}

// 			// If item quantity is less than the range of discount.
// 			else if (
// 				(prevTotal >= group.quantityMin &&
// 					prevTotal <= group.quantityMax &&
// 					totalQuantity < group.quantityMin) ||
// 				(prevTotal >= group.quantityMax &&
// 					prevTotal <= group.quantityMin &&
// 					totalQuantity >= group.quantityMax)
// 			) {
// 				tempItem.quantity = item.quantity;
// 				tempItem.priceWithDiscount = group.discountPrice;
// 				tempItem.discountApplied = true;
// 				tempItem.subTotal = item.quantity * group.discountPrice;

// 				// Adding item to discounted array.
// 				finalArray.push(tempItem);
// 				prevTotal = totalQuantity;
// 				totalQuantity = totalQuantity - item.quantity;
// 				item.quantity = 0;
// 				group.quantityMax = group.quantityMax - item.quantity;
// 				console.log(
// 					"--> 9   T=" +
// 						totalQuantity +
// 						" I=" +
// 						item.quantity +
// 						" G=" +
// 						group.quantityMax
// 				);
// 			}

// 			// If item quantity is less than the range of discount.
// 			else if (
// 				totalQuantity < group.quantityMin &&
// 				totalQuantity < group.quantityMax
// 			) {
// 				tempItem.quantity = item.quantity;
// 				tempItem.priceWithDiscount = item.price;
// 				tempItem.discountApplied = false;
// 				tempItem.subTotal = item.quantity * item.price;

// 				// Adding item to discounted array.
// 				finalArray.push(tempItem);
// 				console.log(
// 					"--> 2   T=" +
// 						totalQuantity +
// 						" I=" +
// 						item.quantity +
// 						" G=" +
// 						group.quantityMax
// 				);
// 			}

// 			// If item quantity is greater than the range of discount.
// 			else if (totalQuantity > 0 && item.quantity >= group.quantityMax) {
// 				var itemInRange = {};
// 				var itemAboveRange = {};
// 				var tempItemQuantity =
// 					group.quantityMax > 0
// 						? group.quantityMax
// 						: item.quantity - initialGroupMax;

// 				var tempGroupMax =
// 					group.quantityMax - item.quantity < 0
// 						? 0
// 						: group.quantityMax - item.quantity;

// 				//
// 				if (group.quantityMax > 0 && totalQuantity > 0) {
// 					// Adding new fields to item in range.
// 					itemInRange.name = item.name;
// 					itemInRange.quantity = tempItemQuantity;
// 					itemInRange.discountGroup = item.discountGroup;
// 					itemInRange.price = item.price;
// 					itemInRange.priceWithDiscount = group.discountPrice;
// 					itemInRange.discountApplied = true;
// 					itemInRange.subTotal = tempItemQuantity * group.discountPrice;

// 					// Adding item to discounted array.
// 					finalArray.push(itemInRange);

// 					prevTotal = totalQuantity;
// 					totalQuantity -= tempItemQuantity; // TOTAL
// 					item.quantity -= group.quantityMax;
// 					group.quantityMax = tempGroupMax;
// 					console.log(
// 						"--> 3   T=" +
// 							totalQuantity +
// 							" I=" +
// 							item.quantity +
// 							" G=" +
// 							group.quantityMax
// 					);
// 				}

// 				if (group.quantityMax <= 0 && totalQuantity > 0) {
// 					// Adding new fields to item Above range.
// 					itemAboveRange.name = item.name;
// 					itemAboveRange.quantity = item.quantity;
// 					itemAboveRange.discountGroup = item.discountGroup;
// 					itemAboveRange.price = item.price;
// 					itemAboveRange.priceWithDiscount = group.discountPrice;
// 					itemAboveRange.discountApplied = false;
// 					itemAboveRange.subTotal = item.quantity * item.price;

// 					// Adding item to discounted array.
// 					finalArray.push(itemAboveRange);

// 					prevTotal = totalQuantity;
// 					totalQuantity -= item.quantity; // TOTAL
// 					item.quantity = 0;
// 					group.quantityMax = tempGroupMax;
// 					console.log(
// 						"--> 4   T=" +
// 							totalQuantity +
// 							" I=" +
// 							item.quantity +
// 							" G=" +
// 							group.quantityMax
// 					);
// 				}
// 			}
// 		});
// 	});

// 	cart.forEach((item) => {
// 		if (item.discountGroup === null) {
// 			var tempItem = {};
// 			tempItem.name = item.name;
// 			tempItem.quantity = item.quantity;
// 			tempItem.discountGroup = item.discountGroup;
// 			tempItem.price = item.price;
// 			tempItem.priceWithDiscount = item.price;
// 			tempItem.discountApplied = false;
// 			tempItem.subTotal = item.quantity * item.price;

// 			finalArray.push(tempItem);
// 		}
// 	});

// 	return finalArray;
// }

// const discountedCart = calculation(discountGroups, cart);
// console.log(discountedCart);
