import styled, { keyframes } from "styled-components";

export const TableWrapper = styled.div`
	border-radius: 5px;
	margin-top: 2em;
	background-color: white;
	padding: 2em;
`;

export const Table = styled.div`
	display: grid;
	grid-template-columns: 1fr 7fr 1fr;
`;

export const GridWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	text-align: center;
`;

export const Header = styled.div`
	margin-bottom: 1em;
`;

export const Slot = styled.button`
	border: none;
	border-radius: 5px;
	font-size: 14px;
	font-weight: bold;
	padding: 0.5em 1em;
	background: #eff4fd;
	color: #2a61a9;
	cursor: pointer;
	margin-bottom: 10px;

	&:last-child {
		margin-bottom: 0;
	}

	&.taken {
		background: transparent;
		color: #c2c3ca;
		text-decoration: line-through;
	}
`;

export const BubbleButton = styled.button`
	background: #eff4fd;
	color: #2a61a9;
	cursor: pointer;
	height: 40px;
	width: 40px;
	margin: 0 auto;
	border: none;
	border-radius: 50%;

	&:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
`;

const expand = keyframes`
  from {
    max-height: 240px;
  }
  to {
    max-height: 1800px;
  }
`;

const collapse = keyframes`
  from {
    max-height: 1800px;
  }
  to {
    max-height: 240px;
  }
`;

export const DataContainer = styled.div`
	max-height: 240px;
	overflow: hidden;
	border-bottom: 1px solid #c2c3ca;
	transition: max-height 0.5s ease-out;

	&.collapsed {
		animation: ${collapse} 0.5s forwards;
	}

	&.expanded {
		animation: ${expand} 0.5s forwards;
		overflow: hidden;
		height: auto;
	}
`;

export const MoreInfoButton = styled.div`
	align-items: center;
	color: #2a61a9;
	cursor: pointer;
	display: flex;
	justify-content: center;
`;
