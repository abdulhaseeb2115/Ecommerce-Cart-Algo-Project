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
		quantity: 2,
		discountGroup: "1674663626996x199296414591483900",
		price: 5,
	},
	{
		name: "item 3",
		quantity: 3,
		discountGroup: "1674663626996x199296414591483900",
		price: 5,
	},
	{
		name: "item 4",
		quantity: 2,
		discountGroup: null,
		price: 5,
	},
];

// const cart = [
// 	{
// 		name: "1674817833855x454465949574103000",
// 		quantity: 8,
// 		discountGroup: "1674508763771x658553238447456300",
// 		price: 10,
// 	},
// 	{
// 		name: "1674817848386x177860725726248960",
// 		quantity: 1,
// 		discountGroup: "1674508763771x658553238447456300",
// 		price: 5,
// 	},
// ];

function calculation() {
	const mapDisGroupsToQuantityMax = {};
	const mapDisGroupsToQuantityMin = {};
	const mapDisGroupsToDiscountPrice = {};
	const mapDisGroupToNumberOfItems = {};

	discountGroups.forEach((item) => {
		mapDisGroupsToQuantityMax[item.id] = item.quantityMax;
		mapDisGroupsToQuantityMin[item.id] = item.quantityMin;
		mapDisGroupsToDiscountPrice[item.id] = item.discountPrice;
	});

	cart.forEach((item) => {
		if (item.discountGroup) {
			if (mapDisGroupToNumberOfItems[item.discountGroup]) {
				mapDisGroupToNumberOfItems[item.discountGroup] += item.quantity;
			} else {
				mapDisGroupToNumberOfItems[item.discountGroup] = item.quantity;
			}
		}
	});

	let newCart = [];

	cart.forEach((item) => {
		if (mapDisGroupToNumberOfItems[item.discountGroup]) {
			//-> discount group exists
			if (
				mapDisGroupToNumberOfItems[item.discountGroup] >=
				mapDisGroupsToQuantityMin[item.discountGroup]
			) {
				//-> total items >= group minimum
				if (mapDisGroupsToQuantityMax[item.discountGroup] < 1) {
					//-> group max <= 0
					newCart.push({
						...item,
						quantity: item.quantity,
						priceWithDiscount: mapDisGroupsToDiscountPrice[item.discountGroup],
						discountApplied: false,
						subTotal: item.quantity * item.price,
					});
				} else {
					//-> group max > 0
					if (mapDisGroupsToQuantityMax[item.discountGroup] >= item.quantity) {
						//-> group max >= item quantity
						newCart.push({
							...item,
							priceWithDiscount:
								mapDisGroupsToDiscountPrice[item.discountGroup],
							discountApplied: true,
							subTotal:
								item.quantity * mapDisGroupsToDiscountPrice[item.discountGroup],
						});

						mapDisGroupsToQuantityMax[item.discountGroup] -= item.quantity; // update group max
					} else {
						//-> group max < item quantity
						let quantitySplit =
							item.quantity - mapDisGroupsToQuantityMax[item.discountGroup];

						newCart.push({
							...item,
							quantity: item.quantity - quantitySplit,
							priceWithDiscount:
								mapDisGroupsToDiscountPrice[item.discountGroup],
							discountApplied: true,
							subTotal:
								(item.quantity - quantitySplit) *
								mapDisGroupsToDiscountPrice[item.discountGroup],
						});

						newCart.push({
							...item,
							quantity: quantitySplit,
							priceWithDiscount:
								mapDisGroupsToDiscountPrice[item.discountGroup],
							discountApplied: false,
							subTotal: quantitySplit * item.price,
						});

						mapDisGroupsToQuantityMax[item.discountGroup] = 0; // update group max
					}
				}
			} else {
				//-> total items < group minimum
				newCart.push({
					...item,
					priceWithDiscount: mapDisGroupsToDiscountPrice[item.discountGroup],
					discountApplied: false,
					subTotal: item.quantity * item.price,
				});

				mapDisGroupsToQuantityMax[item.discountGroup] = 0; // update group max
			}
		} else {
			//-> discount group doesn't exists
			newCart.push({
				...item,
				priceWithDiscount: item.price,
				discountApplied: false,
				subTotal: item.quantity * item.price,
			});
		}
	});

	console.log(newCart);
}

calculation();
