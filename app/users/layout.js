import Provider from '@components/Provider';
import UserNav from '@components/usernav';

const UserLayout = ({ children }) => {
    return (
        <Provider>
            <UserNav />
            <section className=''>{children}</section>
        </Provider>
    )
};

export default UserLayout;