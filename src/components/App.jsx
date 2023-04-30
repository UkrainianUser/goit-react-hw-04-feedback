import React, { useState} from "react";
import css from './App.module.css';
import Statistics from './statistics/Statistics';
import FeedbackOptions from "./feedbackOptions/FeedbackOptions";
import Notification from './notification/Notification';
import Section from "./section/Section";

export default function App () {

	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleClick = (option) => {
		switch (option) {
		case 'good':
		setGood((prevGood) => prevGood + 1);
		break;
		case 'neutral':
		setNeutral((prevNeutral) => prevNeutral + 1);
		break;
		case 'bad':
		setBad((prevBad) => prevBad + 1);
		break;
		default:
		break;
		}
	};

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };
  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total ? Math.round((good / total) * 100) : 0;
  };

		const total = countTotalFeedback();
		const options = ['good', 'neutral', 'bad'];

		return (<div className={css.feedback}>
			<Section title="Please leave feedback">
				<FeedbackOptions options={options} onLeaveFeedback={handleClick} />
			</Section>

			{total > 0 ? (
				<Section title="Statistics">
					<Statistics 
						onGood={good}
						onNeutral={neutral} 
						onBad={bad} 
						onCountPositiveFeedbackPercentage={countPositiveFeedbackPercentage} 
						onCountTotalFeedback={countTotalFeedback} 
					/>
				</Section>
			) : (<Notification message="There is no feedback" />)}
		</div>)
};