import React from 'react';

import TileBase from './TileBase';

interface PostsToApproveTileProps {}

const PostsToApproveTile = ({}: PostsToApproveTileProps) => {
	return (
		<TileBase width={'25%'} title="Posts to approve">
			...
		</TileBase>
	);
};

export default PostsToApproveTile;
