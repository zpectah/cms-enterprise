import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useComments } from '../../hooks/model';
import { Preloader } from '../ui';

const NewCommentWrapper = styled.div``;
const ListWrapper = styled.div``;

interface CommentsManagerProps {
	assigned: 'post' | 'category';
	assignedId: string | number;
}

const CommentsManager = ({ assigned, assignedId }: CommentsManagerProps) => {
	const {
		Comments,
		createComments,
		updateComments,
		deleteComments,
		reloadComments,
		confirmComments,
		cancelComments,
		toggleComments,
		comments_loading,
		comments_error,
	} = useComments();
	const [currentCommentsList, setCurrentCommentsList] = useState([]);

	const setCurrentList = () => {
		let tmp = [];

		Comments.map((comment) => {
			if (comment.assigned == assigned && comment.assigned_id == assignedId)
				tmp.push(comment);
		});

		setCurrentCommentsList(tmp);
	};

	useEffect(() => {
		if (Comments) setCurrentList();
	}, [Comments]);

	return (
		<>
			{/* <NewCommentWrapper>NewCommentWrapper</NewCommentWrapper> */}
			<ListWrapper>
				CommentsManager...{assigned}...#{assignedId}
				<br />
				{currentCommentsList.map((item) => (
					<div key={item.id}>
						<div>
							{item.email}|{item.created}
						</div>
						<div>{item.title}</div>
						<div>{item.content}</div>
					</div>
				))}
			</ListWrapper>
			<Preloader.Bar isProcessing={comments_loading} />
		</>
	);
};

export default CommentsManager;
