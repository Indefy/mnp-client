import React from "react";
import "../scss/components/_article-card.scss";

// Component for displaying individual article card
const ArticleCard = ({ article }) => {
	return (
		<div className="article-card">
			<img src={article.image} alt={article.title} className="article-image" />
			<div className="article-content">
				<h2 className="article-title">{article.title}</h2>
				<p className="article-description">{article.description}</p>
				<div className="article-footer">
					<span className="article-category">{article.category}</span>
					<span className="article-date">{article.date}</span>
					<span className="article-author">By {article.author}</span>
				</div>
			</div>
		</div>
	);
};

export default ArticleCard;
