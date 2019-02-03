module.exports = {
    check_seesion_cookies: 'SELECT * FROM users_info WHERE ID=?',
    contacts_sql_add: 'INSERT INTO vandor (vandor, qq,phone,name,system,duty)VALUE(?,?,?,?,?,?)',
    normal_sql_del: 'DELETE FROM ?? WHERE ID in (?)',
    contacts_sql_set: 'UPDATE vandor SET vandor=?,qq=?, phone=?,name=?, system=?, duty=?WHERE ID=?',
    contacts_sql_data_info_for_search: 'SELECT * FROM vandor WHERE instr(concat(vandor,qq,phone,name,system,duty), ?) ORDER BY ID ASC',
    contacts_sql_data_info: 'SELECT * FROM vandor',
    web_sql_add: 'INSERT INTO system_web (system_name, web1,web2,admin_name,password) VALUE(?, ?, ?, ?, ?)',
    web_sql_set: 'UPDATE system_web SET web1=?,web2=?,admin_name=?,password=?,system_name=? WHERE ID=?',
    ser_sql_set: 'UPDATE server_info SET model=?,system_name=?,admin_name=?,password=?,OS=?,status=?,address=?,connect_link1=?,connect_link2=?,hosts_ip=?,system_software=?,port=? WHERE ID=?',
    ser_sql_add: 'INSERT INTO server_info (model,hosts_ip,system_name,admin_name,password,OS,address,status,connect_link1,connect_link2,system_software,port) VALUE(?,?,?,?,?,?,?,?,?,?,?,?)',
    net_sql_set: 'UPDATE network_info SET model=?,hosts_ip=?,admin_name=?,password=?,status=?,address=? WHERE ID=?',
    net_sql_add: 'INSERT INTO network_info (model, hosts_ip,admin_name,password,status,address) VALUE(?, ?, ?, ?,?, ?)',
    sql_sql_add: 'INSERT INTO sql_info (model,instance, hosts_ip,admin_name,password,state,address,system_name,port) VALUE(?,?,?,?,?,?,?,?,?)',
    sql_sql_set: 'UPDATE sql_info SET model=?, instance=?,hosts_ip=?,admin_name=?,password=?,system_name=?,state=?,address=?,port=? WHERE ID=?',
    edu_sql_add: 'INSERT INTO file_edu (download_name,create_time,file_size,creator,file_name) VALUE(?,?,?,?,?)'
};