import { useLayoutEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	Button,
} from 'react-native';
import IconButton from '../components/IconButton';
import List from '../components/MealDetail/List';
import Subtitle from '../components/MealDetail/Subtitle';
import MealDetails from '../components/MealDetails';
import { MEALS } from '../data/dummy-data';

const MealDetailScreen = ({ route, navigation }) => {
	const mealId = route.params.mealId;
	function headerButtonPressHandler() {
		console.log('pressed');
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<IconButton
						onPress={headerButtonPressHandler}
						icon='star'
						color='white'
					/>
				);
			},
		});
	}, [navigation, headerButtonPressHandler]);

	const selectedMeal = MEALS.find(meal => meal.id === mealId);

	return (
		<ScrollView>
			<Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
			<Text style={styles.title}>{selectedMeal.title}</Text>
			<MealDetails
				affordability={selectedMeal.affordability}
				duration={selectedMeal.duration}
				complexity={selectedMeal.complexity}
				textStyle={styles.detailText}
			/>
			<View style={styles.listOuterContainer}>
				<View style={styles.listContainer}>
					<Subtitle>Ingredients</Subtitle>
					<List data={selectedMeal.ingredients} />

					<Subtitle>Steps</Subtitle>
					<List data={selectedMeal.steps} />
				</View>
			</View>
		</ScrollView>
	);
};
export default MealDetailScreen;
const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: 350,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 24,
		margin: 8,
		textAlign: 'center',
		color: 'white',
	},
	detailText: {
		color: 'white',
	},
	subtitle: {
		color: '#e2b497',
		fontSize: 18,
		fontWeight: 'bold',

		textAlign: 'center',
	},
	subtitleContainer: {
		padding: 6,
		marginHorizontal: 24,
		marginVertical: 4,
		borderBottomColor: '#e2b497',
		borderBottomWidth: 2,
	},
	listOuterContainer: {
		alignItems: 'center',
		marginBottom: 32,
	},
	listContainer: {
		width: '80%',
	},
});
