import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@mui/material";

// ArticleCard component, Displays individual article information in a card format
const ArticleCard = ({ title, image, category, date, author }) => (
	<Card>
		{image && <img src={image} alt={title} className="article-image" />}
		<CardContent>
			<Typography variant="h5">{title}</Typography>
			<Typography variant="subtitle1">{category}</Typography>
			<Typography variant="body2">{date}</Typography>
			<Typography variant="body2">By {author}</Typography>
		</CardContent>
	</Card>
);

ArticleCard.propTypes = {
	title: PropTypes.string.isRequired,
	image: PropTypes.string,
	category: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
};

export default ArticleCard;
