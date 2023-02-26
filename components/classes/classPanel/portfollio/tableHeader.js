const TableHeader = ({portfollio}) => {
    return (
        <thead>
        <tr>
        {portfollio &&
          portfollio.map((skill) => {
            const colspan = skill.skills.length;
            const rowspan = 1;
            return (
              <th
                className="bodycol"
                key={`parent-${skill.id}`}
                id={skill.id}
                rowSpan={rowspan}
                colSpan={colspan}
              ><div class="topHead-text" key={skill?.parent_skill?.name} title={skill?.parent_skill?.name}>{skill.parent_skill?.name?.length > 25 ? skill?.parent_skill?.name.substring(0, 25).concat('...') : skill?.parent_skill?.name}</div></th>
            )
          })}
        </tr>
    </thead>
    )
}

export default TableHeader