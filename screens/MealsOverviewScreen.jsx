import { useLayoutEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import MealItem from '../components/MealItem';
import { MEALS, CATEGORIES } from '../data/dummy-data';

const MealsOverviewScreen = ({ navigation, route }) => {
	const categoryId = route.params.categoryId;

	useLayoutEffect(() => {
		const categoryTitle = CATEGORIES.find(
			category => category.id === categoryId
		).title;
		navigation.setOptions({
			title: categoryTitle,
		});
	}, [categoryId, navigation]);

	const displayedMeals = MEALS.filter(mealItem => {
		return mealItem.categoryIds.indexOf(categoryId) >= 0;
	});

	function renderMealItem(itemData) {
		const item = itemData.item;
		const mealItemProps = {
			id: item.id,
			title: item.title,
			imageUrl: item.imageUrl,
			affordability: item.affordability,
			complexity: item.complexity,
			duration: item.duration,
		};
		return <MealItem {...mealItemProps} />;
	}
	return (
		<View style={styles.container}>
			<FlatList
				data={displayedMeals}
				keyExtractor={item => item.id}
				renderItem={renderMealItem}
			/>
		</View>
	);
};
export default MealsOverviewScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
});
