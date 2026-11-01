function SolutionSelector({title, subtitle, isSelected, onClick}){
    return (
        <button className={`flex-grow-1 flex-shrink-1 border border-rounded border-[1px] border-rounded-[12px] py-1 px-2 ${isSelected ? 'bg-teal text-ink border-teal' : 'bg-ink text-white border-white'}`} onClick={onClick}>
            <div>
                <h3>{title}</h3>
                <p>{subtitle}</p>
            </div>
        </button>
    )
}

export default SolutionSelector;