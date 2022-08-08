import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';

const Pagination = ({ count, currentPage, previous, next }) => {
	const location = useLocation();
	const { page, ...queryParmas } = queryString.parse(location.search);
	const path = location.pathname;
	const q = queryString.stringify(queryParmas);

	const PAGE_SIZE = 3;

	const renderNumbers = () => {
		let nums = [];
		const num = Math.ceil(count / PAGE_SIZE);

		if (num <= 1) return;

		for (let i = 0; i < num; i++) {
			nums.push(
				<li key={i} className='page-item'>
					<Link
						className={currentPage === i + 1 ? 'page-link active' : 'page-link'}
						to={`${path}?${q}&page=${i + 1}`}
					>
						{i + 1}
					</Link>
				</li>
			);
		}

		return nums;
	};

	return (
		<nav aria-label='Page navigation example'>
			<ul className='pagination'>
				<li className='page-item'>
					<Link
						className={previous ? 'page-link' : 'page-link disabled'}
						to={`${path}?${q}&page=${currentPage - 1}`}
					>
						Previous
					</Link>
				</li>
				{renderNumbers()}
				<li className='page-item'>
					<Link
						className={next ? 'page-link' : 'page-link disabled'}
						to={`${path}?${q}&page=${currentPage + 1}`}
					>
						Next
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
