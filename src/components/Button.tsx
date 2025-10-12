type Props = {
    text: string;
    classname: React.ReactNode;
};

const Button = ({ text, classname }: Props) => {
    return (
        <button className={`bg-blue-700 text-white px-4 font-semibold py-2 rounded-4xl hover:bg-blue-800 transition ${classname}`}>
            {text}
        </button>
    );
};

export default Button;