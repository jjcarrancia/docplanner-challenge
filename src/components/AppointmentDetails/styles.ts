import styled from "styled-components";
import Calendar from "src/assets/calendar.svg";

export const DateCard = styled.div`
	background-color: white;
	border-radius: 5px;
	display: flex;
	margin: 1em 0 2em;
	padding: 1em;

	span.line-through {
		text-decoration: line-through;
	}
`;

export const CalendarIcon = styled.div`
	width: 1.5em;
	height: 1.5em;
	background-color: #98a2ac;
	margin-right: 1em;
	mask: url(${Calendar}) no-repeat center / contain;
	-webkit-mask: url(${Calendar}) no-repeat center / contain;
`;

export const Spinner = styled.div`
	animation: spin 0.6s linear infinite;
	border: 4px solid rgba(0, 0, 0, 0.1);
	border-radius: 50%;
	border-top-color: #000;
	height: 1em;
	margin-right: 1em;
	width: 1em;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
