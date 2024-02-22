import React, {ReactNode} from 'react';
import Sidebar from '../components/Sidebar';

interface Props {
    children: ReactNode;
};

const Layout: React.FC<Props> = ({children}) => {
	return (
		<div>
			<Sidebar />
			<main className='background'>{children}</main>
		</div>
	)
}

export default Layout
